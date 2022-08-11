import React, { createContext, useEffect, useReducer } from 'react'
import s3 from 'src/utils/s3'

const initialState = {
  slotImageUrl: '',
  conductorImageUrl: '',
  holeImageUrl: '',
  housingImageUrl: '',
  mainImageUrl: '',
  axialImageUrl:'',
  contourImageUrl:'',
  coolingImageUrl:'',
  lossesImageUrl:'',
}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      slotImageUrl: '',
      conductorImageUrl: '',
      holeImageUrl: '',
      housingImageUrl: '',
      mainImageUrl: '',
      axialImageUrl: '',
      contourImageUrl: '',
      coolingImageUrl:'',
      lossesImageUrl:''
    }
  },

  SET_SLOT_IMAGE_URL: (state, action) => {
    return {
      ...state,
      slotImageUrl: action.payload,
    }
  },
  SET_CONDUCTOR_IMAGE_URL: (state, action) => {
    return {
      ...state,
      conductorImageUrl: action.payload,
    }
  },
  SET_MAIN_IMAGE_URL: (state, action) => {
    return {
      ...state,
      mainImageUrl: action.payload,
    }
  },
  SET_HOUSING_IMAGE_URL: (state, action) => {
    return {
      ...state,
      housingImageUrl: action.payload,
    }
  },
  SET_HOLE_IMAGE_URL: (state, action) => {
    return {
      ...state,
      holeImageUrl: action.payload,
    }
  },
  SET_AXIAL_IMAGE_URL: (state, action) => {
    return {
      ...state,
      axialImageUrl: action.payload,
    }
  },
  SET_CONTOUR_IMAGE_URL: (state, action) => {
    return {
      ...state,
      contourImageUrl: action.payload,
    }
  },
  SET_COOLING_IMAGE_URL: (state, action) => {
    return {
      ...state,
      coolingImageUrl: action.payload,
    }
  },
  SET_LOSSES_IMAGE_URL: (state, action) => {
    return {
      ...state,
      coolingImageUrl: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const ImageContext = createContext({
  ...initialState,
  getSlotImageUrl: () => Promise.resolve(),
  getCondutorImageUrl: () => Promise.resolve(),
  getMainImageUrl: () => Promise.resolve(),
  getHousingImageUrl: () => Promise.resolve(),
  getHoleImageUrl: () => Promise.resolve(),
  getAxialImageUrl: () => Promise.resolve(),
  getContourImageUrl :()=> Promise.resolve(),
  getCoolingImageUrl :() => Promise.resolve(),
  getLossesImageUrl:() =>Promise.resolve(),
  clearSlotImageUrl: () => Promise.resolve(),
  clearConductorImageUrl: () => Promise.resolve(),
  clearHousingImageUrl: () => Promise.resolve(),
  clearHoleImageUrl: () => Promise.resolve(),
  clearMainImageUrl: () => Promise.resolve(),
  clearAxialImageUrl: () => Promise.resolve(),
  clearContourImageUrl :() => Promise.resolve(),
  clearCoolingImageUrl: () => Promise.resolve(),
  clearLossesImageUrl:()=>Promise.resolve()
})

const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: null,
      })
    }
    initialize()
  }, [])

  //  Get slot image url
  const getSlotImageUrl = (slotType) => {
    try {
      console.log(process.env.REACT_APP_BUCKET_NAME)
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `Images/Slots/${slotType}.png`,
      })
      promise
        .then((url) => {
          console.log(url)
          dispatch({
            type: 'SET_SLOT_IMAGE_URL',
            payload: url,
          })
          dispatch({
            type: 'SET_HOLE_IMAGE_URL',
            payload: '',
          })
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error)
    }
  }

  const clearSlotImageUrl = () => {
    dispatch({
      type: 'SET_SLOT_IMAGE_URL',
      payload: ''
    })
  }

  const getHousingImageurl = (housingType) => {
    try {
      console.log(process.env.REACT_APP_BUCKET_NAME)
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `Images/Housings/${housingType}.png`,
      })
      promise
        .then((url) => {
          console.log(url)
          dispatch({
            type: 'SET_HOUSING_IMAGE_URL',
            payload: url,
          })
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error)
    }
  }

  const clearHousingImageUrl = () => {
    dispatch({
      type: 'SET_HOUSING_IMAGE_URL',
      payload: ''
    })
  }

  const getHoleImageUrl = (holeType) => {
    try {
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `Images/Holes/${holeType}.png`,
      })
      promise
        .then((url) => {
          console.log(url)
          dispatch({
            type: 'SET_HOLE_IMAGE_URL',
            payload: url,
          })
          dispatch({
            type: 'SET_SLOT_IMAGE_URL',
            payload: '',
          })
          dispatch({
            type: 'SET_CONDUCTOR_IMAGE_URL',
            payload: '',
          })
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error)
    }
  }

  const clearHoleImageUrl = () => {
    dispatch({
      type: 'SET_HOLE_IMAGE_URL',
      payload: ''
    })
  }

  //  Get conductor image url
  const getConductorImageUrl = (conductorType) => {
    try {
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `Images/Conductors/${conductorType}.png`,
      })
      promise
        .then((url) => {
          console.log(url)
          dispatch({
            type: 'SET_CONDUCTOR_IMAGE_URL',
            payload: url,
          })
          dispatch({
            type: 'SET_HOLE_IMAGE_URL',
            payload: '',
          })
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error)
    }
  }

  const clearConductorImageUrl = () => {
    dispatch({
      type: 'SET_CONDUCTOR_IMAGE_URL',
      payload: ''
    })
  }

  //  Get main image url
  const getMainImageUrl = (machineID) => {
    try {
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `${machineID}/MachinePlot.png`,
      });
      promise
        .then((url) => {
          console.log(url);
          dispatch({
            type: 'SET_MAIN_IMAGE_URL',
            payload: url,
          })
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error)
    }
  }

  const clearMainImageUrl = () => {
    dispatch({
      type: 'SET_MAIN_IMAGE_URL',
      payload: ''
    })
  }
  const getAxialImageUrl  = (axialComponent,machineID) => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks

      console.log(axialComponent,machineID)
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `${machineID}/Results/LPTN/AxialPlots/${axialComponent}.png`,
      })
      //   var params = {Bucket: process..env.REACT_APP_BUCKET_NAME, Key: 'images.jpg'};
      //   var promise = s3.getSignedUrlPromise('getObject', params);
      //   promise.then(function(url) {
      //       res.send(url)
      //   }, function(err) { console.log(err) });
      promise
          .then((url) => {
            console.log(url)
            dispatch({
              type: 'SET_AXIAL_IMAGE_URL',
              payload: url,
            })
          })
          .catch((error) => {
            throw error
          })
    } catch (error) {
      console.log(error)
    }
  }

  const clearAxialImageUrl = () => {
    dispatch({
      type: 'SET_AXIAL_IMAGE-URL',
      payload: ''
    })
  }
  const getContourImageUrl  = (contourValue,machineID) => {
    try {
      console.log(contourValue,machineID)
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `${machineID}/Results/LPTN/ContourPlots/Contours_StatorWinding_${contourValue}.png`,
      })
      promise
          .then((url) => {
            console.log(url)
            dispatch({
              type: 'SET_CONTOUR_IMAGE_URL',
              payload: url,
            })
          })
          .catch((error) => {
            throw error
          })
    } catch (error) {
      console.log(error)
    }
  }
  const clearContourImageUrl = () => {
    dispatch({
      type: 'SET_CONTOUR_IMAGE_URL',
      payload: ''
    })
  }
  const getCoolingImageUrl  = (value) => {
    try {
      console.log(value)
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `Images/Cooling/Types/${value}.jpg`,
      })
      promise
          .then((url) => {
            console.log(url)
            dispatch({
              type: 'SET_COOLING_IMAGE_URL',
              payload: url,
            })
          })
          .catch((error) => {
            throw error
          })
    } catch (error) {
      console.log(error)
    }
  }
  const clearCoolingImageUrl = () => {
    dispatch({
      type: 'SET_COOLING_IMAGE_URL',
      payload: ''
    })
  }
  const getLossesImagesUrl  = (value) => {
    try {
      console.log(value)
      let promise = s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `Images/losses/Types/${value}.jpg`,
      })
      promise
          .then((url) => {
            console.log(url)
            dispatch({
              type: 'SET_LOSSES_IMAGES_URL',
              payload: url,
            })
          })
          .catch((error) => {
            throw error
          })
    } catch (error) {
      console.log(error)
    }
  }
  const clearLossesImageUrl = () => {
    dispatch({
      type: 'SET_LOSSES_IMAGE_URL',
      payload: ''
    })
  }
  return (
    <ImageContext.Provider
      value={{
        ...state,
        getSlotImageUrl,
        getConductorImageUrl,
        getMainImageUrl,
        getHousingImageurl,
        getHoleImageUrl,
        getAxialImageUrl,
        getContourImageUrl,
        getCoolingImageUrl,
        clearContourImageUrl,
        clearSlotImageUrl,
        clearConductorImageUrl,
        clearHousingImageUrl,
        clearHoleImageUrl,
        clearMainImageUrl,
        clearAxialImageUrl,
        clearCoolingImageUrl,
        clearLossesImageUrl,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export { ImageContext, ImageProvider }

//https://ecscohere.s3.eu-west-1.amazonaws.com/Images/Results/AxialPlots/undefined.png?AWSAccessKeyId=AKIAYCABKPB7GP3FOS4Z&Expires=1643117703&Signature=eM6%2BERCFSRH6%2BJGHKjdiyvZULyU%3D