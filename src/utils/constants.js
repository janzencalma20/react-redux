export const PROJECT_NAME = 'Cohere'
export const MODEL_TREE = 'Dashboard'
export const DIMENSIONS = 'Dimensions'
export const COOLING = 'Cooling'
export const LOSSES = 'Losses'
export const LPTN = 'LPTN'
export const FEA = 'FEA'
export const CFD = 'CFD'
export const RESULTS = 'Results'
export const BACKEND_URL =
  'http://ec2-54-228-143-226.eu-west-1.compute.amazonaws.com:8000'
export const FORM_DATA = {
  statorConductor: {
    AWG: {
      Type: 'AWG',
      Gauge: 12,
      Units: {}
    },
    SWG: {
      Type: 'SWG',
      Gauge: 12,
      Units: {}
    },
    Manual: {
      Type: 'Manual',
      Wwire: 0.723,
      Wins_wire: 0.04,
      Units: {
        Wins_wire:'mm',
        Wwire:'mm'
      }
    },
    SquareConductor: {
      Type: 'SquareConductor',
      Wwire: 0.0071,
      Hwire: 0.0028,
      Wins_wire: 0.0004,
      Units: {
        Wins_wire:'mm',
        Wwire:'mm',
        Hwire:'mm'
      }
    }
  },
  statorWinding: {
    RandomWound: {
      Type: 'RandomWound',
      Nlayer: 'Single',
      Nppath: 1,
      Nturns: 5,
      Nstrands: 10,
      Coilspan: 3,

      ImpregnationMaterial: {
        Name: 'Epoxy'
      },
      WallInsulationThickness: '',
      WallInsulationMaterial: {
        Name: 'Epoxy'
      },
      WedgeThickness: '',
      WedgeMaterial: {
        Name: 'Epoxy'
      },
      SeparatorThickness: '', // only shown if NLayer != 'Single’
      SeparatorMaterial: { // only shown if NLayer != 'Single’
        Name: 'Epoxy'
      },

      WindingMaterial: {
        Name: 'Copper'
      },
      InsulationMaterial: {
        Name: 'Epoxy'
      },
      Units: {}
    },
    BarWound: {
      Type: 'BarWound',
      Nlayer: 'Single',
      Nppath: 1,
      Nturns: 5,
      Nstrands: 10,
      Ncond_tan: 2,
      Coilspan: 3,

      WallInsulationThickness: '',
      WallInsulationMaterial: {
        Name: 'Epoxy'
      },
      WedgeThickness: '',
      WedgeMaterial: {
        Name: 'Epoxy'
      },
      SeparatorThickness: '', // only shown if NLayer != 'Single’
      SeparatorMaterial: { // only shown if NLayer != 'Single’
        Name: 'Epoxy'
      },
      CoilInsulationThickness: '',
      CoilInsulationMaterial: {
        Name: 'Epoxy'
      },
      TopSpacerThickness: '',
      TopSpacerMaterial: {
        Name: 'Epoxy'
      },
      BottomSpacerThickness: '',
      BottomSpacerMaterial: {
        Name: 'Epoxy'
      },
      LeftSpacerThickness: '',
      LeftSpacerMaterial: {
        Name: 'Epoxy'
      },
      RightSpacerThickness: '',
      RightSpacerMaterial: {
        Name: 'Epoxy'
      },

      WindingMaterial: {
        Name: 'Copper'
      },
      InsulationMaterial: {
        Name: 'Epoxy'
      },
      Units: {}
    }
  },
  rotorConductor: {
    AWG: {
      Type: 'AWG',
      Gauge: 12,
      Units: {}
    },
    SWG: {
      Type: 'SWG',
      Gauge: 12,
      Units: {}
    },
    Manual: {
      Type: 'Manual',
      Wwire: 0.723,
      Wins_wire: 0.04,
      Units: {
        Wins_wire:'mm',
        Wwire:'mm'
      }
    },
    SquareConductor: {
      Type: 'SquareConductor',
      Wwire: 0.0071,
      Hwire: 0.0028,
      Wins_wire: 0.0004,
      Units: {
        Wins_wire:'mm',
        Wwire:'mm',
        Hwire:'mm'
      }
    }
  },
  rotorWinding: {
    RandomWound: {
      Type: 'RandomWound',
      Nturns: 5,
      Nstrands: 10,

      ImpregnationMaterial: {
        Name: 'Epoxy'
      },
      WallInsulationThickness: '',
      WallInsulationMaterial: {
        Name: 'Epoxy'
      },

      WindingMaterial: {
        Name: 'Copper'
      },
      InsulationMaterial: {
        Name: 'Epoxy'
      },
      Units: {}
    },
    BarWound: {
      Type: 'BarWound',
      Nturns: 5,
      Nstrands: 10,
      Ncond_tan: 2,

      WallInsulationThickness: '',
      WallInsulationMaterial: {
        Name: 'Epoxy'
      },

      WindingMaterial: {
        Name: 'Copper'
      },
      InsulationMaterial: {
        Name: 'Epoxy'
      },
      Units: {}
    }
  },
  housing: {
    Frame: {
      Type: 'Frame',
      FrameLength: 0.302,
      ExternalRadius: 0.09,
      InternalRadius: 0.085,
      Material: {
        Name: 'Aluminium (Cast)'
      },
      Units:{
        FrameLength: 'm',
        ExternalRadius: 'm',
        InternalRadius: 'm',
        Material: 'Aluminium',
      }
    },
    FrameBar: {
      Type: 'FrameBar',
      FrameLength: 1.796,
      ExternalRadius: 0.76,
      InternalRadius: 0.75,
      Barrelgap: 0,
      NBar: 12,
      WidthBar: 0.05,
      Material: {
        Name: 'Aluminium (Cast)'
      },
      Units:{
        FrameLength: 'm',
        ExternalRadius: 'm',
        InternalRadius: 'm',
        Barrelgap: 'm',
        NBar: 'm',
        WidthBar: 'm',
        Material: '',
      }
    },
  },
  Cooling_Data:{
    AmbientTemp:'',
    Altitude:'',
    Flowrate:''
  },
  Cooling: {
    ThroughFlow: {
      DisplayName: 'Through Flow',
      Type:'ThroughFlow',
      AmbientTemp: '',
      Altitude: '',
      Flowrate:'',
      WaterJacket: {
        WithWaterJacket: '',
        WithoutWaterJacket: '',
      },
    },
    EnclosedWithFan: {
      DisplayName: 'Enclosed With Fan',
      Type:'EnclosedWithFan',
      InletAirTemperature: '',
      TotalFlowRate: '',
      Altitude:'',
      WaterJacket: {
        WithWaterJacket: '',
        WithoutWaterJacket: '',
      },
    },
    EnclosedWithoutFan: {
      DisplayName: 'Enclosed Without Fan',
      Type:'EnclosedWithoutFan',
      InletAirTemperature: '',
      TotalFlowRate: '',
      Altitude:'',
      WaterJacket: {
        WithWaterJacket: '',
        WithoutWaterJacket: '',
      },
    },
  },
  WaterJacket: {
    WithWaterJacket: {
      InletAirTemperature:'',
      Flowrate:'',
    },
    WithoutWaterJacket: '',
  },
  Frame_Hole:{
    Airgap:'',
  },
  Rotor_Lamhole:{
    Airgap:'',
  },
  FrameBar_Slot:{
    TopIp:'',
    BottomIP:'',
    Airgap:'',
    Barrelgap:'',
  },
  Frame_Slot:{
    BottomIP:'',
    Airgap:'',
    Barrelgap:'',
  },
  FrameBar_Hole:{
    Barrelgap:'',
    Airgap:''
  },
  CoolingSetp:{
    Value1:'',
    Value2:'',
    Value3:''
  },
  slot_stator: {
    GeneralSlot: {
      Type: 'GeneralSlot',
      W0: 0.003,
      H0: 0.002,
      W1: 0.005,
      H1: 0.00065,
      W2: 0.005,
      H2: 0.0234,
      R1: 0.0001,
      // W3: 0, Red value
      // W4: 0, Red value

      H1_is_rad: false,
      Zs: 72,
      SeparatorHeight: 0.0088,
      SeparatorMaterial: {
        Name: 'Epoxy'
      },
      SlotWallInsulationThickness: 0.0025,
      WallLinerConductivity: 0.25,
      Units:{
        H0: 'm',
        H1: 'm',
        H1_is_rad: false,
        H2: 'm',
        W0: 'm',
        W1: 'm',
        W2: 'm',
        Zs: ''
      }
    },
    ParallelSlot: {
      Type: 'ParallelSlot',
      W0: 0.003,
      H0: 0.002,
      W1: 0.00065,
      H1: 0.005,
      // W2: 0, Red value
      H2: 0.0234,
      R1: 0.0001,
      // W3: 0, Red value
      // W4: 0, Red value

      Zs: 74,
      SeparatorHeight: 0.0088,
      SeparatorMaterial: {
        Name: 'Epoxy'
      },
      SlotWallInsulationThickness: 0.000125,
      WallLinerConductivity: 0.1,
      Units:{
        W0: 'm',
        H0: 'm',
        W1: 'm',
        H1: 'm',
        H2: 'm',
        R1: 'm',
        Zs: ''
      }
    },
    ParallelTooth: {
      Type: 'ParallelTooth',
      W0: 0.003,
      H0: 0.002,
      // W1: 0, Red value
      H1: 0.005,
      // W2: 0, Red value
      H2: 0.0234,
      R1: 0.0001,
      W3: 0.00625,
      // W4: 0, Red value
      Zs: 36,
      SeparatorHeight: 0.0088,
      SeparatorMaterial: {
        Name: 'Epoxy'
      },
      SlotWallInsulationThickness: 0.000125,
      WallLinerConductivity: 0.1,
      Units:{
        W0: 'm',
        H0: 'm',
        H1: 'm',
        H2: 'm',
        R1: 'm',
        W3: 'm',
        Zs: ''
      }
    }
  },
  slot_rotor: {
    SlotW60: {
      Type: "SlotW60",
      H1: 0.01422,
      H2: 0.2225,
      H3: 0.0,
      H4: 0.0685,
      R1: 0.4515,
      W1: 0.47,
      W2: 0.27,
      W3: 0.03,
      Zs: 4,
      SlotWallInsulationThickness: 0.00018,
      WallLinerConductivity: 0.25,
      Units: {
        H1: 'm',
        H2: 'm',
        H3: 'm',
        H4: 'm',
        R1: 'm',
        W1: 'm',
        W2: 'm',
        W3: 'm',
        Zs: '',
        SlotWallInsulationThickness: 'm',
        WallLinerConductivity: 'W/(mK)'
      }
    }
  },
  hole: {
    HoleM52: {
      Type: 'HoleM52',
      H0: 0.001,
      H1: 0.005,
      H2: 0.0,
      W0: 0.027,
      W3: 0.001,
      Zh: 8,
      Material: {
        Name: 'Aluminium (Cast)'
      },
      Units:{
        H0: 'm',
        H1: 'm',
        H2: 'm',
        W0: 'm',
        W3: 'm',
        Zh: ''
      }
    },
    HoleM58: {
      Type: 'HoleM58',
      H0: 0.003,
      H1: 0.0,
      H2: 0.02,
      W0: 0.003,
      W1: 0.013,
      W2: 0.01,
      W3: 0.01,
      R0: 0.01,
      Zh: 6,
      Material: {
        Name: 'Aluminium (Cast)'
      },
      Units:{
        H0: 'm',
        H1: 'm',
        H2: 'm',
        W0: 'm',
        W1: 'm',
        W2: 'm',
        W3: 'm',
        R0: 'm',
        Zh: '',
      }
    },
  },
  lamination_rotor: {
    LamSlot: {
      Type: 'LamSlot',
      Material: {
        Name: 'M250-35A'
      },
      CoreLength: 1.225,
      PackingFactor: 0.97,
      ExternalRadius: 0.4515,
      InternalRadius: 0.17,
      ResinConductivity: 0.22,
      NDECopperOverhang: 0.53,
      DECopperOverhang: 0.53,
      Units:{
        Material: '',
        CoreLength: 'm',
        PackingFactor: 'm',
        ExternalRadius: 'm',
        InternalRadius: 'm',
        ResinConductivity: "W/(mK)",
        NDECopperOverhang: "m",
        DECopperOverhang: "m"
      }
    },
    LamHole: {
      Type: 'LamHole',
      Material: {
        Name: 'M250-35A'
      },
      CoreLength: 0.257,
      PackingFactor: 0.97,
      ExternalRadius: 0.0492,
      InternalRadius: 0.024,
      ResinConductivity: 0.22,
      Units: {
        CoreLength: 'm',
        PackingFactor: 'm',
        ExternalRadius: 'm',
        InternalRadius: 'm',
        ResinConductivity: "W/(mK)"
      }
    }
  },
  lamination_stator:{
    LamSlot: {
      Type: 'LamSlot',
      Material: {
        Name: 'M250-35A'
      },
      CoreLength: 0.254,
      PackingFactor: 0.95,
      ExternalRadius: 0.085,
      InternalRadius: 0.05,
      ResinConductivity: 0.22,
      NDECopperOverhang: 0.03892,
      DECopperOverhang: 0.03892,
      Units:{
        Material:'',
        CoreLength:'m',
        PackingFactor:'m',
        ExternalRadius:'m',
        InternalRadius:'m',
        ResinConductivity: "W/(mK)",
        NDECopperOverhang: "m",
        DECopperOverhang: "m"
      }
    },

  },
  material: {
    Air: {
      Type: 'Air',
      HeatConductivity: 0.0257,
      Cp: 1007.0,
    },
    Steel1: {
      Type: 'Steel1',
      HeatConductivity: 43.0,
      Cp: 460.0,
    },
    Copper1: {
      Type: 'Copper1',
      HeatConductivity: 385.0,
      Cp: 381.0,
    },
    Resin: {
      Type: 'Resin',
      HeatConductivity: 0.3,
      Cp: 671.0,
    },
    Insulator1: {
      Type: 'Insulator1',
      HeatConductivity: 0.3,
      Cp: 671.0,
    },
    Magnet1: {
      Type: 'Magnet1',
      HeatConductivity: 8.5,
      Cp: 450.0,
    },
    Aluminium: {
      Type: 'Aluminium',
      HeatConductivity: 200.0,
      Cp: 910.0,
    }
  },
};

export const Layers = [
  'Single',
  'Double Vertical',
  'Double Horizontal'
];

export const Axial_Data= {
  axialType:{
    Airgap:{
      Type:'Airgap'
    },
    EWFluidRotor:{
      Type:'EWFluidRotor'
    },
    EWFluidStator:{
      Type:'EWFluidStator'
    },
    RotorLamInner:{
      Type:'RotorLamInner'
    },
    RotorLamOuter:{
      Type:'RotorLamOuter'
    },
    RotorMagnet:{
      Type:'RotorMagnet'
    },
    Shaft:{
      Type:'Shaft'
    },
    StatorBackIron:{
      Type:'StatorBackIron'
    },
    StatorTooth:{
      Type:'StatorTooth'
    },
    StatorWinding:{
      TypeNamePrefix:'StatorWinding'
    },
    WaterJacket:{
      Type:'WaterJacket'
    }
  }
};

export const contour_data= {
  numbers:[
    {
      number:0
    },
    {
      number:1
    },
    {
      number:2
    },
    {
      number:3
    },
    {
      number: 4
    },
    {
      number: 5
    },
    {
      number: 6
    },
    {
      number: 7
    },
    {
      number: 8
    },
    {
      number: 9
    },
    {
      number: 10
    },
    {
      number: 11
    },
    {
      number: 12
    },
    {
      number: 13
    },
    {
      number: 14
    },
    {
      number: 15
    },
    {
      number: 16
    },
    {
      number: 17
    },
  ]
};
export const HtcData={
  Surface:{
    surfacename1:'',
    surfacename2:'',
    surfacename3:'',
  },
  HTCType:{
    ConstantValue:'120.5',
    Correlation:{
      option1:'',
      option2:''
    },
    variableValue:{

    }
  }
}

export const LOSS_DATA= {
  "WRSM": {
    "RotorPoleShoeTip": {
      "name": "Rotor Pole Shoe Tip",
      "region": "Core",
      "type": "Absolute",
      "loss": 7237
    },
    "RotorPoleShoeMid": {
      "name": "Rotor Pole Shoe Mid",
      "region": "Core",
      "type": "Absolute",
      "loss": 14303
    },
    "RotorWindingCore": {
      "name": "Rotor Winding Core",
      "region": "Core",
      "type": "Absolute",
      "loss": 14221
    },
    "RotorWindingEW-NDE": {
      "name": "Rotor Winding EW-NDE",
      "region": "EW-NDE-Rotor",
      "type": "Absolute",
      "loss": 5100
    },
    "RotorWindingEW-DE": {
      "name": "Rotor Winding EW-DE",
      "region": "EW-DE-Rotor",
      "type": "Absolute",
      "loss": 5100
    },
    "StatorWindingCore": {
      "name": "Stator Winding Core",
      "region": "Core",
      "type": "Absolute",
      "loss": 19460
    },
    "StatorWindingEW-NDE": {
      "name": "Stator Winding EW-NDE",
      "region": "EW-NDE-Stator",
      "type": "Absolute",
      "loss": 9360
    },
    "StatorWindingEW-DE": {
      "name": "Stator Winding EW-DE",
      "region": "EW-DE-Stator",
      "type": "Absolute",
      "loss": 9360
    },
    "StatorTooth": {
      "name": "Stator Tooth",
      "region": "Core",
      "type": "Absolute",
      "loss": 8170
    },
    "StatorBackIron": {
      "name": "Stator Back Iron",
      "region": "Core",
      "type": "Absolute",
      "loss": 26450
    }
  },
  "IPMSM": {
    "StatorWindingCore": {
      "name": "Stator Winding Core",
      "region": "Core",
      "type": "Absolute",
      "loss": 1855.8
    },
    "StatorWindingEW-NDE": {
      "name": "Stator Winding EW-NDE",
      "region": "EW-NDE-Stator",
      "type": "Absolute",
      "loss": 309.3
    },
    "StatorWindingEW-DE": {
      "name": "Stator Winding EW-DE",
      "region": "EW-DE-Stator",
      "type": "Absolute",
      "loss": 309.3
    },
    "StatorBackIron": {
      "name": "Stator Back Iron",
      "region": "Core",
      "type": "Absolute",
      "loss": 255.1
    },
    "StatorTooth": {
      "name": "Stator Tooth",
      "region": "Core",
      "type": "Absolute",
      "loss": 887.4
    },
    "RotorLamInner": {
      "name": "Rotor LamInner",
      "region": "Core",
      "type": "Absolute",
      "loss": 2.1
    },
    "RotorLamOuter": {
      "name": "Rotor LamOuter",
      "region": "Core",
      "type": "Absolute",
      "loss": 83.9
    },
    "RotorMagnet": {
      "name": "Rotor Magnet",
      "region": "Core",
      "type": "Absolute",
      "loss": 109.9
    }
  }
}

export const htc_method = {
  "UserDefined":"UserDefined",
  "Calculated":"Calculated"
};

export const HTC_CALCULATIONS = [
  "Correlation",
  "Absolute"
];

export const HTC_DATA = {
  "LamHole": {
    "AirgapRotor": {
      "calculation": "Correlation",
      "value": 120
    },
    "AirgapStator": {
      "calculation": "Correlation",
      "value": 120
    },
    "RotorFace": {
      "calculation": "Correlation",
      "value": 50
    },
    "Shaft": {
      "calculation": "Correlation",
      "value": 30
    },
    "StatorFace": {
      "calculation": "Correlation",
      "value": 50
    },
    "StatorOuterEW": {
      "calculation": "Correlation",
      "value": 40
    },
    "StatorInnerEW": {
      "calculation": "Correlation",
      "value": 90
    },
    "Housing": {
      "calculation": "Correlation",
      "value": 20
    }
  },
  "LamSlot": {
    "AirgapRotor": {
      "calculation": "Correlation",
      "value": 120
    },
    "AirgapStator": {
      "calculation": "Correlation",
      "value": 120
    },
    "TopIP": {
      "calculation": "Correlation",
      "value": 120
    },
    "BottomIP": {
      "calculation": "Correlation",
      "value": 120
    },
    "RotorFace": {
      "calculation": "Correlation",
      "value": 50
    },
    "Shaft": {
      "calculation": "Correlation",
      "value": 30
    },
    "StatorFace": {
      "calculation": "Correlation",
      "value": 50
    },
    "StatorOuterEW": {
      "calculation": "Correlation",
      "value": 40
    },
    "StatorInnerEW": {
      "calculation": "Correlation",
      "value": 90
    },
    "RotorOuterEW": {
      "calculation": "Correlation",
      "value": 90
    },
    "RotorInnerEW": {
      "calculation": "Correlation",
      "value": 90
    },
    "RotorWindingGapEW": {
      "calculation": "Correlation",
      "value": 90
    },
    "Housing": {
      "calculation": "Correlation",
      "value": 20
    },
    "BarrelGap": {
      "calculation": "Correlation",
      "value": 60
    }
  },
  "WaterJacket": {
    "WaterJacket": {
      "calculation": "Correlation",
      "value": 3000
    }
  },
  "FrameBar": {
    "BarrelGap": {
      "calculation": "Correlation",
      "value": 40
    }
  }
};

export const FLOW_RATES_COMMON_DATA = {
  "Fluid": "Air",
  "AmbientTemperature": 10.0,
  "Altitude": 10000.0,
  "Speed": 6000
};

export const COOLING_FLOW_RATES_DATA = {
  "MachineCooling": {
    "ThroughFlow": {
      "ScalingFactor": 1.0
    },
    "EnclosedWithFan": {
      "TotalFlowRate": 4.0,
      "ScalingFactor": 1.0
    },
    "EnclosedWithoutFan": {
    }
  },
  "FluidNetwork": {
    "Rotor": {
      "LamHole": {
        "Airgap": 4.0
      },
      "LamSlot": {
        "Airgap": 1.0,
        "BottomIP": 1.0
      }
    },
    "Housing": {
      "Frame": {},
      "FrameBar": {
        "BarrelGap": 2.0
      }
    }
  },
  "WaterJacket": {
    "InletTemperature": 75.0,
    "FlowRate": 0.00017,
    "ScalingFactor": 1.0,
    "Diameter": 0.008,
    "ContactGapFrame": 1e-6
  }
};

