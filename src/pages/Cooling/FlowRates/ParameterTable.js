import {
  Card,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import {getDisplayName} from "../../../utils/methods";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {FORM_DATA, FLOW_RATES_COMMON_DATA} from "../../../utils/constants";
import React, {useEffect, useState} from "react";

export default function FlowRatesParamTable(props) {

  const { mainData, onChangeCoolingDataValue, isCommon } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (mainData) {
      const _data = {};
      if (isCommon) {
        Object.keys(FLOW_RATES_COMMON_DATA).forEach(commonKey => {
          if (mainData.hasOwnProperty(commonKey)) {
            _data[commonKey] = mainData[commonKey];
          }
        })
      } else {
        const dataKeys = Object.keys(mainData);
        dataKeys.forEach(dataKey => {
          if (Object.keys(FLOW_RATES_COMMON_DATA).indexOf(dataKey) === -1) {
            _data[dataKey] = mainData[dataKey];
          }
        })
      }
      setData(_data);
    }
  }, [isCommon, mainData]);

  return (
    (data && Object.keys(data).length > 0) && (
      <TableContainer component={Card} style={{ marginTop: 20, width: '60%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 1, width: '50%' }}>Parameter</TableCell>
              <TableCell sx={{ py: 1, width: '50%' }}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((keyName, index) => (
              <TableRow key={index}>
                <TableCell className={'tb-cell'}>{ getDisplayName(keyName) }</TableCell>
                <TableCell className={'tb-cell'}>
                  {keyName === 'Fluid' ? (
                    <>
                      <FormControl className={'select-list'}>
                        <Select
                          value={ data[keyName] }
                          onChange={(e) => onChangeCoolingDataValue('MachineCooling', keyName, e.target.value)}
                        >
                          {Object.keys(FORM_DATA.material).map((materialItemKey, index) => (
                              <MenuItem key={index} value={materialItemKey} className={'menu-item'}>
                                { materialItemKey}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </>
                  ) : (
                    <TextField
                      type="number"
                      className={'input-field'}
                      inputProps={{ min: 0, step: 'any' }}
                      size="small"
                      value={ data[keyName] }
                      onChange={(e) => onChangeCoolingDataValue('MachineCooling', keyName, e.target.value)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  )
};