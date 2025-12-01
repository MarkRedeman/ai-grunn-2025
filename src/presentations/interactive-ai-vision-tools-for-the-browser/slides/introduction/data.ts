export const detectionClassificationProject = {
  id: "690f358d4d0462fee98c8b64",
  name: "Eggs detection classification",
  creation_time: "2025-11-08T12:20:29.548000+00:00",
  creator_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
  pipeline: {
    tasks: [
      {
        id: "690f358d4d0462fee98c8b65",
        title: "Dataset",
        task_type: "dataset",
      },
      {
        id: "690f358d4d0462fee98c8b67",
        title: "Detection",
        task_type: "detection",
        labels: [
          {
            id: "690f358d4d0462fee98c8b69",
            name: "Egg",
            is_anomalous: false,
            color: "#ff5662ff",
            hotkey: "",
            is_empty: false,
            group: "Detection labels",
            parent_id: null,
          },
          {
            id: "690f358d4d0462fee98c8b73",
            name: "No object",
            is_anomalous: false,
            color: "#000000ff",
            hotkey: "",
            is_empty: true,
            group: "No object",
            parent_id: null,
          },
        ],
        label_schema_id: "690f358d4d0462fee98c8b75",
      },
      {
        id: "690f358d4d0462fee98c8b6e",
        title: "Crop",
        task_type: "crop",
      },
      {
        id: "690f358d4d0462fee98c8b6a",
        title: "Classification",
        task_type: "classification",
        labels: [
          {
            id: "690f358d4d0462fee98c8b6c",
            name: "Chicken",
            is_anomalous: false,
            color: "#9d3b1aff",
            hotkey: "",
            is_empty: false,
            group: "Detection labels___Color",
            parent_id: "690f358d4d0462fee98c8b69",
          },
          {
            id: "690f358d4d0462fee98c8b6d",
            name: "Duck",
            is_anomalous: false,
            color: "#9b5de5ff",
            hotkey: "",
            is_empty: false,
            group: "Detection labels___Color",
            parent_id: "690f358d4d0462fee98c8b69",
          },
        ],
        label_schema_id: "690f358d4d0462fee98c8b77",
      },
    ],
    connections: [
      {
        from: "690f358d4d0462fee98c8b65",
        to: "690f358d4d0462fee98c8b67",
      },
      {
        from: "690f358d4d0462fee98c8b67",
        to: "690f358d4d0462fee98c8b6e",
      },
      {
        from: "690f358d4d0462fee98c8b6e",
        to: "690f358d4d0462fee98c8b6a",
      },
    ],
  },
  thumbnail:
    "/api/v1/organizations/429e0af4-0a4d-40cb-a916-63391f2b25e4/workspaces/259b6ee5-b025-4fe0-9d23-e9bc3e819300/projects/690f358d4d0462fee98c8b64/thumbnail",
  performance: {
    score: null,
    task_performances: [
      {
        task_id: "690f358d4d0462fee98c8b67",
        score: null,
      },
      {
        task_id: "690f358d4d0462fee98c8b6a",
        score: null,
      },
    ],
  },
  storage_info: {},
  datasets: [
    {
      id: "690f358d4d0462fee98c8b70",
      name: "Dataset",
      use_for_training: true,
      creation_time: "2025-11-08T12:20:29.546000+00:00",
    },
  ],
};

export const detectionClassificationAnnotations = [
  {
    id: "e81f20bd-4e53-4f75-9ffa-5c6046974211",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 268,
      y: 61,
      width: 156,
      height: 129,
    },
  },
  {
    id: "59cdee01-1bdc-4819-9893-060bd19c19ba",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 425,
      y: 55,
      width: 156,
      height: 129,
    },
  },
  {
    id: "2a760fa4-8038-4210-97f7-47059b72bbdd",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 604,
      y: 69,
      width: 142,
      height: 124,
    },
  },
  {
    id: "f5259694-ba54-43a5-984f-f37272bbb830",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 770,
      y: 69,
      width: 162,
      height: 129,
    },
  },
  {
    id: "a383307e-0861-41f5-9768-0a2c0b162c03",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6d",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 937,
      y: 14,
      width: 153,
      height: 175,
    },
  },
  {
    id: "1942cb5f-01aa-4e22-8c94-4e99e37740d4",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 1103,
      y: 51,
      width: 161,
      height: 149,
    },
  },
  {
    id: "b486b4e9-1a57-45c8-88e0-fa5d787068a9",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 231,
      y: 172,
      width: 170,
      height: 165,
    },
  },
  {
    id: "e627fe68-2848-4d6b-b8fb-dfc233762aed",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6d",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 398,
      y: 139,
      width: 170,
      height: 195,
    },
  },
  {
    id: "796733ab-8122-4baf-8086-291d898b6a5c",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 592,
      y: 179,
      width: 150,
      height: 139,
    },
  },
  {
    id: "a0bc8eb2-df7b-4088-8756-7406fbcdf841",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 759,
      y: 182,
      width: 158,
      height: 126,
    },
  },
  {
    id: "069b78e2-e5cc-4fec-8854-dd506a154bc6",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 944,
      y: 176,
      width: 159,
      height: 178,
    },
  },
  {
    id: "dd825b44-9092-4f30-bf51-d1c0489bd35b",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 1120,
      y: 179,
      width: 170,
      height: 176,
    },
  },
  {
    id: "a4efdfef-7099-4a8c-b114-9705f14952ae",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 178,
      y: 316,
      width: 194,
      height: 164,
    },
  },
  {
    id: "299cd983-5eb8-41ab-9c46-2bec7f153872",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 372,
      y: 314,
      width: 181,
      height: 165,
    },
  },
  {
    id: "d77387f5-3939-4296-91af-fe92437d9aca",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 580,
      y: 303,
      width: 165,
      height: 182,
    },
  },
  {
    id: "99083ad9-a460-4f0d-880e-9e167ed07da5",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 764,
      y: 285,
      width: 170,
      height: 170,
    },
  },
  {
    id: "957b0ea1-76ca-4223-8f3c-da187e77f348",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 136,
      y: 458,
      width: 199,
      height: 208,
    },
  },
  {
    id: "033a659f-410a-4b31-867d-78824bdae6eb",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 334,
      y: 458,
      width: 199,
      height: 204,
    },
  },
  {
    id: "9d789398-6ee3-484f-beb4-af47095e05fe",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 539,
      y: 472,
      width: 193,
      height: 179,
    },
  },
  {
    id: "2b86a489-0238-4e2f-983f-01a48b9e798d",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6d",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 754,
      y: 411,
      width: 202,
      height: 241,
    },
  },
  {
    id: "8ab2893a-a01b-43be-a9ca-9d9ae6fd4b33",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 63,
      y: 647,
      width: 234,
      height: 218,
    },
  },
  {
    id: "5077e904-abc7-4afb-b8f9-12591b19e3c9",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 295,
      y: 654,
      width: 213,
      height: 211,
    },
  },
  {
    id: "3bc1bde2-59ae-4729-b577-631c5304db2c",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 523,
      y: 642,
      width: 214,
      height: 219,
    },
  },
  {
    id: "7822c354-afe7-4896-ba77-be4be402a989",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 757,
      y: 636,
      width: 225,
      height: 221,
    },
  },
  {
    id: "4c640efe-8bed-47be-98a6-8cb47721c009",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 964,
      y: 467,
      width: 193,
      height: 188,
    },
  },
  {
    id: "bbab6dab-42f5-4d46-98f2-0a09135c71b5",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 984,
      y: 648,
      width: 210,
      height: 215,
    },
  },
  {
    id: "af5e6feb-e13c-48e8-8bf0-2252bd579552",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 1172,
      y: 463,
      width: 204,
      height: 193,
    },
  },
  {
    id: "b72f3f2d-9c26-4fc9-9f21-da440eef02a6",
    modified: "2025-11-11T12:58:15.900000+00:00",
    labels: [
      {
        id: "690f358d4d0462fee98c8b69",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
      {
        id: "690f358d4d0462fee98c8b6c",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "RECTANGLE",
      x: 1206,
      y: 654,
      width: 223,
      height: 211,
    },
  },
];

export const segmentationProject = {
  id: "68f8f78e4d0462fee98c8809",
  name: "Eggs",
  creation_time: "2025-10-22T15:26:06.806000+00:00",
  creator_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
  pipeline: {
    tasks: [
      {
        id: "68f8f78e4d0462fee98c880a",
        title: "Dataset",
        task_type: "dataset",
      },
      {
        id: "68f8f78e4d0462fee98c880c",
        title: "Instance segmentation",
        task_type: "instance_segmentation",
        labels: [
          {
            id: "68f8f78e4d0462fee98c880e",
            name: "Egg",
            is_anomalous: false,
            color: "#c9e649ff",
            hotkey: "",
            is_empty: false,
            group: "Instance segmentation labels",
            parent_id: null,
          },
          {
            id: "68f8f78e4d0462fee98c8812",
            name: "Empty",
            is_anomalous: false,
            color: "#000000ff",
            hotkey: "",
            is_empty: true,
            group: "Empty",
            parent_id: null,
          },
        ],
        label_schema_id: "68f8f78e4d0462fee98c8814",
      },
    ],
    connections: [
      {
        from: "68f8f78e4d0462fee98c880a",
        to: "68f8f78e4d0462fee98c880c",
      },
    ],
  },
  thumbnail:
    "/api/v1/organizations/429e0af4-0a4d-40cb-a916-63391f2b25e4/workspaces/259b6ee5-b025-4fe0-9d23-e9bc3e819300/projects/68f8f78e4d0462fee98c8809/thumbnail",
  performance: {
    score: 0.955078106309615,
    task_performances: [
      {
        task_id: "68f8f78e4d0462fee98c880c",
        score: {
          value: 0.955078106309615,
          metric_type: "Dice",
        },
      },
    ],
  },
  storage_info: {},
  datasets: [
    {
      id: "68f8f78e4d0462fee98c880f",
      name: "Dataset",
      use_for_training: true,
      creation_time: "2025-10-22T15:26:06.805000+00:00",
    },
  ],
};

export const segmentationAnnotations = [
  {
    id: "90ab2a80-7e8d-491d-b5eb-5202db9e8da3",
    modified: "2025-11-11T12:57:39.588000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 360,
          y: 64,
        },
        {
          x: 384,
          y: 77,
        },
        {
          x: 402,
          y: 95,
        },
        {
          x: 412,
          y: 121,
        },
        {
          x: 418,
          y: 124,
        },
        {
          x: 422,
          y: 141,
        },
        {
          x: 421,
          y: 149,
        },
        {
          x: 412,
          y: 159,
        },
        {
          x: 396,
          y: 164,
        },
        {
          x: 386,
          y: 172,
        },
        {
          x: 375,
          y: 184,
        },
        {
          x: 369,
          y: 187,
        },
        {
          x: 361,
          y: 185,
        },
        {
          x: 347,
          y: 175,
        },
        {
          x: 326,
          y: 170,
        },
        {
          x: 294,
          y: 170,
        },
        {
          x: 285,
          y: 173,
        },
        {
          x: 277,
          y: 172,
        },
        {
          x: 268,
          y: 149,
        },
        {
          x: 268,
          y: 121,
        },
        {
          x: 271,
          y: 110,
        },
        {
          x: 282,
          y: 92,
        },
        {
          x: 298,
          y: 72,
        },
        {
          x: 324,
          y: 63,
        },
        {
          x: 346,
          y: 61,
        },
      ],
    },
  },
  {
    id: "194ad1f1-905d-4995-ac1f-dc3191f8d1d9",
    modified: "2025-11-11T12:57:39.588000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 505,
          y: 57,
        },
        {
          x: 540,
          y: 72,
        },
        {
          x: 562,
          y: 92,
        },
        {
          x: 574,
          y: 113,
        },
        {
          x: 580,
          y: 135,
        },
        {
          x: 578,
          y: 158,
        },
        {
          x: 566,
          y: 167,
        },
        {
          x: 560,
          y: 169,
        },
        {
          x: 548,
          y: 181,
        },
        {
          x: 545,
          y: 181,
        },
        {
          x: 545,
          y: 172,
        },
        {
          x: 529,
          y: 172,
        },
        {
          x: 505,
          y: 152,
        },
        {
          x: 474,
          y: 138,
        },
        {
          x: 450,
          y: 136,
        },
        {
          x: 430,
          y: 142,
        },
        {
          x: 427,
          y: 138,
        },
        {
          x: 425,
          y: 112,
        },
        {
          x: 441,
          y: 75,
        },
        {
          x: 451,
          y: 64,
        },
        {
          x: 476,
          y: 55,
        },
      ],
    },
  },
  {
    id: "14f26bbb-ec71-4128-a304-35e1246d6841",
    modified: "2025-11-11T12:57:39.588000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 689,
          y: 70,
        },
        {
          x: 713,
          y: 83,
        },
        {
          x: 733,
          y: 107,
        },
        {
          x: 744,
          y: 136,
        },
        {
          x: 745,
          y: 161,
        },
        {
          x: 725,
          y: 178,
        },
        {
          x: 716,
          y: 190,
        },
        {
          x: 709,
          y: 192,
        },
        {
          x: 687,
          y: 179,
        },
        {
          x: 666,
          y: 176,
        },
        {
          x: 652,
          y: 178,
        },
        {
          x: 638,
          y: 184,
        },
        {
          x: 626,
          y: 185,
        },
        {
          x: 608,
          y: 167,
        },
        {
          x: 604,
          y: 139,
        },
        {
          x: 611,
          y: 103,
        },
        {
          x: 635,
          y: 78,
        },
        {
          x: 660,
          y: 69,
        },
      ],
    },
  },
  {
    id: "0cdc1604-e9f0-4ec3-9d3e-c1768c05de58",
    modified: "2025-11-11T12:57:39.588000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 883,
          y: 72,
        },
        {
          x: 900,
          y: 81,
        },
        {
          x: 920,
          y: 98,
        },
        {
          x: 930,
          y: 124,
        },
        {
          x: 927,
          y: 152,
        },
        {
          x: 924,
          y: 156,
        },
        {
          x: 911,
          y: 164,
        },
        {
          x: 897,
          y: 176,
        },
        {
          x: 883,
          y: 196,
        },
        {
          x: 865,
          y: 187,
        },
        {
          x: 845,
          y: 181,
        },
        {
          x: 819,
          y: 181,
        },
        {
          x: 813,
          y: 184,
        },
        {
          x: 799,
          y: 184,
        },
        {
          x: 788,
          y: 173,
        },
        {
          x: 770,
          y: 161,
        },
        {
          x: 770,
          y: 136,
        },
        {
          x: 777,
          y: 112,
        },
        {
          x: 790,
          y: 97,
        },
        {
          x: 813,
          y: 78,
        },
        {
          x: 846,
          y: 69,
        },
      ],
    },
  },
  {
    id: "eb972b2f-6856-41bf-acae-b471db1786e2",
    modified: "2025-11-11T12:57:39.588000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1042,
          y: 17,
        },
        {
          x: 1054,
          y: 23,
        },
        {
          x: 1079,
          y: 52,
        },
        {
          x: 1079,
          y: 58,
        },
        {
          x: 1088,
          y: 87,
        },
        {
          x: 1088,
          y: 126,
        },
        {
          x: 1083,
          y: 156,
        },
        {
          x: 1062,
          y: 179,
        },
        {
          x: 1054,
          y: 179,
        },
        {
          x: 1042,
          y: 175,
        },
        {
          x: 1016,
          y: 175,
        },
        {
          x: 998,
          y: 179,
        },
        {
          x: 984,
          y: 187,
        },
        {
          x: 976,
          y: 188,
        },
        {
          x: 956,
          y: 167,
        },
        {
          x: 940,
          y: 156,
        },
        {
          x: 937,
          y: 144,
        },
        {
          x: 937,
          y: 118,
        },
        {
          x: 940,
          y: 112,
        },
        {
          x: 941,
          y: 93,
        },
        {
          x: 955,
          y: 64,
        },
        {
          x: 987,
          y: 28,
        },
        {
          x: 1013,
          y: 15,
        },
        {
          x: 1031,
          y: 14,
        },
      ],
    },
  },
  {
    id: "11abab5f-5a35-4916-871e-3003970ef25c",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1215,
          y: 54,
        },
        {
          x: 1236,
          y: 66,
        },
        {
          x: 1250,
          y: 81,
        },
        {
          x: 1261,
          y: 104,
        },
        {
          x: 1262,
          y: 132,
        },
        {
          x: 1258,
          y: 155,
        },
        {
          x: 1250,
          y: 172,
        },
        {
          x: 1240,
          y: 182,
        },
        {
          x: 1220,
          y: 178,
        },
        {
          x: 1194,
          y: 179,
        },
        {
          x: 1177,
          y: 185,
        },
        {
          x: 1155,
          y: 198,
        },
        {
          x: 1148,
          y: 198,
        },
        {
          x: 1145,
          y: 195,
        },
        {
          x: 1139,
          y: 176,
        },
        {
          x: 1128,
          y: 165,
        },
        {
          x: 1106,
          y: 153,
        },
        {
          x: 1103,
          y: 149,
        },
        {
          x: 1105,
          y: 118,
        },
        {
          x: 1113,
          y: 98,
        },
        {
          x: 1128,
          y: 77,
        },
        {
          x: 1146,
          y: 63,
        },
        {
          x: 1165,
          y: 54,
        },
        {
          x: 1180,
          y: 51,
        },
        {
          x: 1200,
          y: 51,
        },
      ],
    },
  },
  {
    id: "534e5f30-626a-44ca-8c76-b21f53864ebf",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 346,
          y: 176,
        },
        {
          x: 370,
          y: 193,
        },
        {
          x: 393,
          y: 221,
        },
        {
          x: 399,
          y: 267,
        },
        {
          x: 393,
          y: 283,
        },
        {
          x: 376,
          y: 288,
        },
        {
          x: 358,
          y: 302,
        },
        {
          x: 350,
          y: 311,
        },
        {
          x: 344,
          y: 329,
        },
        {
          x: 340,
          y: 336,
        },
        {
          x: 332,
          y: 334,
        },
        {
          x: 321,
          y: 326,
        },
        {
          x: 285,
          y: 314,
        },
        {
          x: 269,
          y: 314,
        },
        {
          x: 256,
          y: 311,
        },
        {
          x: 245,
          y: 299,
        },
        {
          x: 236,
          y: 276,
        },
        {
          x: 233,
          y: 264,
        },
        {
          x: 233,
          y: 241,
        },
        {
          x: 237,
          y: 221,
        },
        {
          x: 251,
          y: 198,
        },
        {
          x: 272,
          y: 178,
        },
        {
          x: 291,
          y: 172,
        },
        {
          x: 329,
          y: 172,
        },
      ],
    },
  },
  {
    id: "0970dff0-cc62-4d3d-bac9-35918839e27f",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 507,
          y: 155,
        },
        {
          x: 531,
          y: 176,
        },
        {
          x: 546,
          y: 196,
        },
        {
          x: 562,
          y: 228,
        },
        {
          x: 565,
          y: 241,
        },
        {
          x: 566,
          y: 282,
        },
        {
          x: 554,
          y: 293,
        },
        {
          x: 546,
          y: 296,
        },
        {
          x: 533,
          y: 309,
        },
        {
          x: 525,
          y: 323,
        },
        {
          x: 517,
          y: 331,
        },
        {
          x: 510,
          y: 331,
        },
        {
          x: 494,
          y: 320,
        },
        {
          x: 476,
          y: 314,
        },
        {
          x: 430,
          y: 311,
        },
        {
          x: 410,
          y: 290,
        },
        {
          x: 398,
          y: 234,
        },
        {
          x: 398,
          y: 210,
        },
        {
          x: 409,
          y: 170,
        },
        {
          x: 418,
          y: 156,
        },
        {
          x: 425,
          y: 149,
        },
        {
          x: 444,
          y: 139,
        },
        {
          x: 474,
          y: 139,
        },
      ],
    },
  },
  {
    id: "d794b598-3aa8-492d-a495-ca27214934df",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 686,
          y: 181,
        },
        {
          x: 715,
          y: 196,
        },
        {
          x: 733,
          y: 222,
        },
        {
          x: 741,
          y: 244,
        },
        {
          x: 741,
          y: 285,
        },
        {
          x: 712,
          y: 314,
        },
        {
          x: 704,
          y: 314,
        },
        {
          x: 689,
          y: 305,
        },
        {
          x: 678,
          y: 302,
        },
        {
          x: 647,
          y: 302,
        },
        {
          x: 634,
          y: 306,
        },
        {
          x: 615,
          y: 317,
        },
        {
          x: 597,
          y: 299,
        },
        {
          x: 592,
          y: 274,
        },
        {
          x: 594,
          y: 237,
        },
        {
          x: 600,
          y: 222,
        },
        {
          x: 612,
          y: 202,
        },
        {
          x: 629,
          y: 188,
        },
        {
          x: 653,
          y: 179,
        },
      ],
    },
  },
  {
    id: "60d8b047-f738-4eb9-9540-848fd399bc2f",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 849,
          y: 184,
        },
        {
          x: 880,
          y: 198,
        },
        {
          x: 895,
          y: 213,
        },
        {
          x: 906,
          y: 228,
        },
        {
          x: 915,
          y: 254,
        },
        {
          x: 915,
          y: 290,
        },
        {
          x: 895,
          y: 305,
        },
        {
          x: 888,
          y: 297,
        },
        {
          x: 865,
          y: 285,
        },
        {
          x: 832,
          y: 283,
        },
        {
          x: 817,
          y: 290,
        },
        {
          x: 793,
          y: 306,
        },
        {
          x: 784,
          y: 297,
        },
        {
          x: 762,
          y: 283,
        },
        {
          x: 759,
          y: 265,
        },
        {
          x: 759,
          y: 241,
        },
        {
          x: 767,
          y: 221,
        },
        {
          x: 776,
          y: 207,
        },
        {
          x: 800,
          y: 188,
        },
        {
          x: 822,
          y: 182,
        },
      ],
    },
  },
  {
    id: "499f74e3-58c1-4a2c-8f58-578d85aed911",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1057,
          y: 182,
        },
        {
          x: 1080,
          y: 198,
        },
        {
          x: 1088,
          y: 207,
        },
        {
          x: 1099,
          y: 228,
        },
        {
          x: 1102,
          y: 242,
        },
        {
          x: 1100,
          y: 285,
        },
        {
          x: 1097,
          y: 291,
        },
        {
          x: 1042,
          y: 345,
        },
        {
          x: 1027,
          y: 352,
        },
        {
          x: 1015,
          y: 352,
        },
        {
          x: 999,
          y: 342,
        },
        {
          x: 976,
          y: 303,
        },
        {
          x: 944,
          y: 279,
        },
        {
          x: 944,
          y: 250,
        },
        {
          x: 947,
          y: 234,
        },
        {
          x: 953,
          y: 221,
        },
        {
          x: 963,
          y: 207,
        },
        {
          x: 976,
          y: 193,
        },
        {
          x: 1004,
          y: 179,
        },
        {
          x: 1036,
          y: 176,
        },
      ],
    },
  },
  {
    id: "ba65716b-1702-4681-b9bb-47e0a7c6a49c",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1240,
          y: 184,
        },
        {
          x: 1258,
          y: 193,
        },
        {
          x: 1275,
          y: 208,
        },
        {
          x: 1284,
          y: 227,
        },
        {
          x: 1288,
          y: 254,
        },
        {
          x: 1285,
          y: 277,
        },
        {
          x: 1281,
          y: 288,
        },
        {
          x: 1281,
          y: 297,
        },
        {
          x: 1276,
          y: 303,
        },
        {
          x: 1240,
          y: 332,
        },
        {
          x: 1197,
          y: 354,
        },
        {
          x: 1189,
          y: 354,
        },
        {
          x: 1183,
          y: 349,
        },
        {
          x: 1178,
          y: 339,
        },
        {
          x: 1174,
          y: 334,
        },
        {
          x: 1171,
          y: 322,
        },
        {
          x: 1160,
          y: 302,
        },
        {
          x: 1135,
          y: 283,
        },
        {
          x: 1128,
          y: 282,
        },
        {
          x: 1122,
          y: 277,
        },
        {
          x: 1120,
          y: 268,
        },
        {
          x: 1123,
          y: 248,
        },
        {
          x: 1137,
          y: 219,
        },
        {
          x: 1151,
          y: 202,
        },
        {
          x: 1163,
          y: 195,
        },
        {
          x: 1195,
          y: 181,
        },
        {
          x: 1215,
          y: 179,
        },
      ],
    },
  },
  {
    id: "8bb9343f-265f-4fed-bfa7-0d279e7f70d0",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 298,
          y: 320,
        },
        {
          x: 318,
          y: 328,
        },
        {
          x: 343,
          y: 345,
        },
        {
          x: 353,
          y: 357,
        },
        {
          x: 369,
          y: 383,
        },
        {
          x: 370,
          y: 414,
        },
        {
          x: 366,
          y: 426,
        },
        {
          x: 363,
          y: 429,
        },
        {
          x: 344,
          y: 434,
        },
        {
          x: 324,
          y: 449,
        },
        {
          x: 314,
          y: 460,
        },
        {
          x: 308,
          y: 470,
        },
        {
          x: 308,
          y: 475,
        },
        {
          x: 303,
          y: 480,
        },
        {
          x: 265,
          y: 460,
        },
        {
          x: 230,
          y: 455,
        },
        {
          x: 211,
          y: 458,
        },
        {
          x: 205,
          y: 457,
        },
        {
          x: 190,
          y: 441,
        },
        {
          x: 184,
          y: 420,
        },
        {
          x: 178,
          y: 408,
        },
        {
          x: 182,
          y: 371,
        },
        {
          x: 187,
          y: 359,
        },
        {
          x: 193,
          y: 351,
        },
        {
          x: 217,
          y: 331,
        },
        {
          x: 231,
          y: 323,
        },
        {
          x: 249,
          y: 317,
        },
        {
          x: 275,
          y: 316,
        },
      ],
    },
  },
  {
    id: "b78eae29-3d93-4aca-98bb-0e4e7f35fd89",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 479,
          y: 317,
        },
        {
          x: 494,
          y: 323,
        },
        {
          x: 514,
          y: 337,
        },
        {
          x: 528,
          y: 349,
        },
        {
          x: 540,
          y: 365,
        },
        {
          x: 552,
          y: 398,
        },
        {
          x: 551,
          y: 427,
        },
        {
          x: 522,
          y: 446,
        },
        {
          x: 497,
          y: 478,
        },
        {
          x: 490,
          y: 477,
        },
        {
          x: 477,
          y: 467,
        },
        {
          x: 448,
          y: 457,
        },
        {
          x: 401,
          y: 457,
        },
        {
          x: 386,
          y: 440,
        },
        {
          x: 381,
          y: 429,
        },
        {
          x: 381,
          y: 423,
        },
        {
          x: 373,
          y: 408,
        },
        {
          x: 372,
          y: 372,
        },
        {
          x: 378,
          y: 355,
        },
        {
          x: 384,
          y: 346,
        },
        {
          x: 409,
          y: 322,
        },
        {
          x: 428,
          y: 314,
        },
        {
          x: 461,
          y: 314,
        },
      ],
    },
  },
  {
    id: "c29434e8-9b18-4a63-aff7-07216c86fe7b",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 692,
          y: 308,
        },
        {
          x: 710,
          y: 320,
        },
        {
          x: 731,
          y: 351,
        },
        {
          x: 741,
          y: 380,
        },
        {
          x: 744,
          y: 414,
        },
        {
          x: 741,
          y: 429,
        },
        {
          x: 710,
          y: 457,
        },
        {
          x: 689,
          y: 484,
        },
        {
          x: 681,
          y: 484,
        },
        {
          x: 666,
          y: 477,
        },
        {
          x: 649,
          y: 472,
        },
        {
          x: 627,
          y: 469,
        },
        {
          x: 614,
          y: 470,
        },
        {
          x: 604,
          y: 466,
        },
        {
          x: 592,
          y: 455,
        },
        {
          x: 582,
          y: 441,
        },
        {
          x: 580,
          y: 389,
        },
        {
          x: 586,
          y: 363,
        },
        {
          x: 597,
          y: 342,
        },
        {
          x: 617,
          y: 319,
        },
        {
          x: 635,
          y: 308,
        },
        {
          x: 650,
          y: 303,
        },
        {
          x: 676,
          y: 303,
        },
      ],
    },
  },
  {
    id: "fb0fc0bb-a4bd-4116-9d11-f04f1d2e83a5",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 865,
          y: 287,
        },
        {
          x: 886,
          y: 299,
        },
        {
          x: 912,
          y: 326,
        },
        {
          x: 924,
          y: 351,
        },
        {
          x: 932,
          y: 386,
        },
        {
          x: 930,
          y: 420,
        },
        {
          x: 926,
          y: 424,
        },
        {
          x: 906,
          y: 412,
        },
        {
          x: 894,
          y: 409,
        },
        {
          x: 877,
          y: 408,
        },
        {
          x: 858,
          y: 411,
        },
        {
          x: 828,
          y: 423,
        },
        {
          x: 814,
          y: 432,
        },
        {
          x: 791,
          y: 454,
        },
        {
          x: 765,
          y: 431,
        },
        {
          x: 764,
          y: 424,
        },
        {
          x: 764,
          y: 366,
        },
        {
          x: 780,
          y: 325,
        },
        {
          x: 810,
          y: 296,
        },
        {
          x: 832,
          y: 285,
        },
      ],
    },
  },
  {
    id: "d0d4fdcc-78e1-4281-a2b5-fb79ff129663",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 260,
          y: 461,
        },
        {
          x: 282,
          y: 470,
        },
        {
          x: 308,
          y: 490,
        },
        {
          x: 331,
          y: 529,
        },
        {
          x: 331,
          y: 567,
        },
        {
          x: 334,
          y: 587,
        },
        {
          x: 327,
          y: 599,
        },
        {
          x: 305,
          y: 607,
        },
        {
          x: 277,
          y: 627,
        },
        {
          x: 266,
          y: 640,
        },
        {
          x: 260,
          y: 660,
        },
        {
          x: 254,
          y: 665,
        },
        {
          x: 225,
          y: 651,
        },
        {
          x: 191,
          y: 644,
        },
        {
          x: 168,
          y: 627,
        },
        {
          x: 158,
          y: 616,
        },
        {
          x: 156,
          y: 610,
        },
        {
          x: 147,
          y: 599,
        },
        {
          x: 136,
          y: 567,
        },
        {
          x: 138,
          y: 536,
        },
        {
          x: 144,
          y: 512,
        },
        {
          x: 148,
          y: 504,
        },
        {
          x: 171,
          y: 480,
        },
        {
          x: 184,
          y: 470,
        },
        {
          x: 196,
          y: 464,
        },
        {
          x: 220,
          y: 458,
        },
        {
          x: 245,
          y: 458,
        },
      ],
    },
  },
  {
    id: "a71747ad-375a-457a-a431-a488b3f0254e",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 222,
          y: 653,
        },
        {
          x: 239,
          y: 660,
        },
        {
          x: 256,
          y: 671,
        },
        {
          x: 280,
          y: 700,
        },
        {
          x: 288,
          y: 716,
        },
        {
          x: 289,
          y: 725,
        },
        {
          x: 294,
          y: 731,
        },
        {
          x: 295,
          y: 739,
        },
        {
          x: 292,
          y: 781,
        },
        {
          x: 285,
          y: 794,
        },
        {
          x: 275,
          y: 803,
        },
        {
          x: 262,
          y: 809,
        },
        {
          x: 251,
          y: 811,
        },
        {
          x: 216,
          y: 840,
        },
        {
          x: 205,
          y: 861,
        },
        {
          x: 164,
          y: 864,
        },
        {
          x: 136,
          y: 860,
        },
        {
          x: 113,
          y: 847,
        },
        {
          x: 83,
          y: 820,
        },
        {
          x: 73,
          y: 806,
        },
        {
          x: 63,
          y: 768,
        },
        {
          x: 66,
          y: 734,
        },
        {
          x: 70,
          y: 720,
        },
        {
          x: 83,
          y: 697,
        },
        {
          x: 96,
          y: 682,
        },
        {
          x: 115,
          y: 666,
        },
        {
          x: 139,
          y: 654,
        },
        {
          x: 173,
          y: 647,
        },
        {
          x: 196,
          y: 647,
        },
      ],
    },
  },
  {
    id: "4c4f6a5b-24f8-4bf8-a43f-c1ee08a74a91",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 438,
          y: 659,
        },
        {
          x: 456,
          y: 668,
        },
        {
          x: 468,
          y: 680,
        },
        {
          x: 474,
          y: 683,
        },
        {
          x: 490,
          y: 700,
        },
        {
          x: 502,
          y: 725,
        },
        {
          x: 505,
          y: 737,
        },
        {
          x: 507,
          y: 772,
        },
        {
          x: 500,
          y: 798,
        },
        {
          x: 470,
          y: 821,
        },
        {
          x: 439,
          y: 856,
        },
        {
          x: 424,
          y: 863,
        },
        {
          x: 384,
          y: 864,
        },
        {
          x: 360,
          y: 856,
        },
        {
          x: 358,
          y: 853,
        },
        {
          x: 327,
          y: 834,
        },
        {
          x: 317,
          y: 823,
        },
        {
          x: 311,
          y: 809,
        },
        {
          x: 301,
          y: 798,
        },
        {
          x: 297,
          y: 781,
        },
        {
          x: 295,
          y: 758,
        },
        {
          x: 298,
          y: 735,
        },
        {
          x: 305,
          y: 719,
        },
        {
          x: 317,
          y: 697,
        },
        {
          x: 340,
          y: 674,
        },
        {
          x: 366,
          y: 660,
        },
        {
          x: 387,
          y: 654,
        },
        {
          x: 421,
          y: 654,
        },
      ],
    },
  },
  {
    id: "561d8bfb-3a9a-450b-9fcc-7b069336590c",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 477,
          y: 470,
        },
        {
          x: 499,
          y: 487,
        },
        {
          x: 513,
          y: 503,
        },
        {
          x: 528,
          y: 535,
        },
        {
          x: 531,
          y: 545,
        },
        {
          x: 531,
          y: 579,
        },
        {
          x: 526,
          y: 599,
        },
        {
          x: 516,
          y: 602,
        },
        {
          x: 505,
          y: 613,
        },
        {
          x: 497,
          y: 616,
        },
        {
          x: 485,
          y: 628,
        },
        {
          x: 474,
          y: 647,
        },
        {
          x: 465,
          y: 656,
        },
        {
          x: 454,
          y: 660,
        },
        {
          x: 442,
          y: 659,
        },
        {
          x: 419,
          y: 651,
        },
        {
          x: 393,
          y: 650,
        },
        {
          x: 353,
          y: 613,
        },
        {
          x: 344,
          y: 601,
        },
        {
          x: 337,
          y: 582,
        },
        {
          x: 334,
          y: 570,
        },
        {
          x: 334,
          y: 533,
        },
        {
          x: 340,
          y: 515,
        },
        {
          x: 353,
          y: 493,
        },
        {
          x: 366,
          y: 481,
        },
        {
          x: 395,
          y: 463,
        },
        {
          x: 415,
          y: 458,
        },
        {
          x: 444,
          y: 458,
        },
      ],
    },
  },
  {
    id: "5f556099-fe89-4cfa-ab72-0ee397f16d43",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 667,
          y: 480,
        },
        {
          x: 689,
          y: 490,
        },
        {
          x: 712,
          y: 512,
        },
        {
          x: 724,
          y: 530,
        },
        {
          x: 730,
          y: 555,
        },
        {
          x: 728,
          y: 602,
        },
        {
          x: 724,
          y: 611,
        },
        {
          x: 681,
          y: 651,
        },
        {
          x: 676,
          y: 651,
        },
        {
          x: 667,
          y: 645,
        },
        {
          x: 640,
          y: 639,
        },
        {
          x: 595,
          y: 645,
        },
        {
          x: 571,
          y: 628,
        },
        {
          x: 557,
          y: 613,
        },
        {
          x: 552,
          y: 594,
        },
        {
          x: 543,
          y: 581,
        },
        {
          x: 539,
          y: 564,
        },
        {
          x: 539,
          y: 541,
        },
        {
          x: 548,
          y: 515,
        },
        {
          x: 562,
          y: 496,
        },
        {
          x: 572,
          y: 487,
        },
        {
          x: 591,
          y: 478,
        },
        {
          x: 614,
          y: 472,
        },
        {
          x: 635,
          y: 472,
        },
      ],
    },
  },
  {
    id: "54e56d6c-c75f-4ab6-b0aa-6d0693aaa0ca",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 663,
          y: 647,
        },
        {
          x: 683,
          y: 656,
        },
        {
          x: 702,
          y: 670,
        },
        {
          x: 721,
          y: 693,
        },
        {
          x: 731,
          y: 717,
        },
        {
          x: 736,
          y: 735,
        },
        {
          x: 736,
          y: 769,
        },
        {
          x: 727,
          y: 797,
        },
        {
          x: 686,
          y: 841,
        },
        {
          x: 670,
          y: 852,
        },
        {
          x: 646,
          y: 860,
        },
        {
          x: 601,
          y: 858,
        },
        {
          x: 595,
          y: 853,
        },
        {
          x: 575,
          y: 846,
        },
        {
          x: 565,
          y: 838,
        },
        {
          x: 543,
          y: 815,
        },
        {
          x: 536,
          y: 800,
        },
        {
          x: 531,
          y: 781,
        },
        {
          x: 523,
          y: 768,
        },
        {
          x: 525,
          y: 742,
        },
        {
          x: 531,
          y: 717,
        },
        {
          x: 539,
          y: 699,
        },
        {
          x: 548,
          y: 685,
        },
        {
          x: 574,
          y: 660,
        },
        {
          x: 585,
          y: 657,
        },
        {
          x: 597,
          y: 648,
        },
        {
          x: 624,
          y: 642,
        },
        {
          x: 643,
          y: 642,
        },
      ],
    },
  },
  {
    id: "2a155c0d-2e3f-468d-9081-41cb632c08dd",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 909,
          y: 415,
        },
        {
          x: 923,
          y: 424,
        },
        {
          x: 947,
          y: 458,
        },
        {
          x: 955,
          y: 486,
        },
        {
          x: 955,
          y: 545,
        },
        {
          x: 943,
          y: 582,
        },
        {
          x: 930,
          y: 604,
        },
        {
          x: 927,
          y: 614,
        },
        {
          x: 917,
          y: 627,
        },
        {
          x: 906,
          y: 634,
        },
        {
          x: 863,
          y: 634,
        },
        {
          x: 840,
          y: 639,
        },
        {
          x: 816,
          y: 650,
        },
        {
          x: 785,
          y: 625,
        },
        {
          x: 762,
          y: 601,
        },
        {
          x: 756,
          y: 575,
        },
        {
          x: 754,
          y: 547,
        },
        {
          x: 757,
          y: 519,
        },
        {
          x: 771,
          y: 486,
        },
        {
          x: 788,
          y: 461,
        },
        {
          x: 808,
          y: 440,
        },
        {
          x: 834,
          y: 421,
        },
        {
          x: 846,
          y: 415,
        },
        {
          x: 869,
          y: 411,
        },
        {
          x: 894,
          y: 411,
        },
      ],
    },
  },
  {
    id: "b9acddc6-cb3f-4438-8b1c-f99f086bdb20",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 915,
          y: 642,
        },
        {
          x: 946,
          y: 660,
        },
        {
          x: 967,
          y: 685,
        },
        {
          x: 981,
          y: 717,
        },
        {
          x: 981,
          y: 757,
        },
        {
          x: 978,
          y: 772,
        },
        {
          x: 966,
          y: 798,
        },
        {
          x: 929,
          y: 835,
        },
        {
          x: 915,
          y: 844,
        },
        {
          x: 903,
          y: 846,
        },
        {
          x: 881,
          y: 853,
        },
        {
          x: 846,
          y: 855,
        },
        {
          x: 822,
          y: 850,
        },
        {
          x: 796,
          y: 835,
        },
        {
          x: 780,
          y: 823,
        },
        {
          x: 762,
          y: 797,
        },
        {
          x: 757,
          y: 772,
        },
        {
          x: 757,
          y: 737,
        },
        {
          x: 764,
          y: 719,
        },
        {
          x: 780,
          y: 686,
        },
        {
          x: 799,
          y: 666,
        },
        {
          x: 816,
          y: 654,
        },
        {
          x: 840,
          y: 642,
        },
        {
          x: 855,
          y: 637,
        },
        {
          x: 900,
          y: 637,
        },
      ],
    },
  },
  {
    id: "dcd84aa1-896e-43a8-8286-7824deb03ac7",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1145,
          y: 666,
        },
        {
          x: 1174,
          y: 696,
        },
        {
          x: 1187,
          y: 726,
        },
        {
          x: 1192,
          y: 754,
        },
        {
          x: 1192,
          y: 769,
        },
        {
          x: 1186,
          y: 795,
        },
        {
          x: 1175,
          y: 814,
        },
        {
          x: 1148,
          y: 843,
        },
        {
          x: 1117,
          y: 860,
        },
        {
          x: 1071,
          y: 861,
        },
        {
          x: 1050,
          y: 858,
        },
        {
          x: 1036,
          y: 847,
        },
        {
          x: 1015,
          y: 823,
        },
        {
          x: 987,
          y: 798,
        },
        {
          x: 985,
          y: 794,
        },
        {
          x: 984,
          y: 714,
        },
        {
          x: 1002,
          y: 683,
        },
        {
          x: 1028,
          y: 660,
        },
        {
          x: 1060,
          y: 648,
        },
        {
          x: 1105,
          y: 648,
        },
      ],
    },
  },
  {
    id: "794851a1-ec43-4c94-b07b-f179518f034a",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1082,
          y: 469,
        },
        {
          x: 1096,
          y: 473,
        },
        {
          x: 1120,
          y: 487,
        },
        {
          x: 1145,
          y: 516,
        },
        {
          x: 1154,
          y: 545,
        },
        {
          x: 1155,
          y: 581,
        },
        {
          x: 1135,
          y: 621,
        },
        {
          x: 1111,
          y: 642,
        },
        {
          x: 1105,
          y: 645,
        },
        {
          x: 1062,
          y: 645,
        },
        {
          x: 1031,
          y: 654,
        },
        {
          x: 993,
          y: 614,
        },
        {
          x: 970,
          y: 598,
        },
        {
          x: 964,
          y: 567,
        },
        {
          x: 966,
          y: 539,
        },
        {
          x: 978,
          y: 510,
        },
        {
          x: 998,
          y: 489,
        },
        {
          x: 1008,
          y: 481,
        },
        {
          x: 1027,
          y: 472,
        },
        {
          x: 1047,
          y: 467,
        },
      ],
    },
  },
  {
    id: "26137481-d66c-462f-adc4-d17b73ef15eb",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1299,
          y: 466,
        },
        {
          x: 1325,
          y: 477,
        },
        {
          x: 1351,
          y: 498,
        },
        {
          x: 1360,
          y: 513,
        },
        {
          x: 1367,
          y: 532,
        },
        {
          x: 1373,
          y: 539,
        },
        {
          x: 1374,
          y: 561,
        },
        {
          x: 1359,
          y: 602,
        },
        {
          x: 1322,
          y: 636,
        },
        {
          x: 1315,
          y: 639,
        },
        {
          x: 1301,
          y: 650,
        },
        {
          x: 1287,
          y: 654,
        },
        {
          x: 1250,
          y: 654,
        },
        {
          x: 1236,
          y: 645,
        },
        {
          x: 1227,
          y: 627,
        },
        {
          x: 1215,
          y: 614,
        },
        {
          x: 1207,
          y: 611,
        },
        {
          x: 1197,
          y: 602,
        },
        {
          x: 1186,
          y: 601,
        },
        {
          x: 1177,
          y: 596,
        },
        {
          x: 1172,
          y: 576,
        },
        {
          x: 1174,
          y: 542,
        },
        {
          x: 1186,
          y: 512,
        },
        {
          x: 1201,
          y: 493,
        },
        {
          x: 1226,
          y: 475,
        },
        {
          x: 1249,
          y: 466,
        },
        {
          x: 1282,
          y: 463,
        },
      ],
    },
  },
  {
    id: "c1e73208-c28f-4f2e-a59b-0ca65c03f18b",
    modified: "2025-11-11T12:57:39.589000+00:00",
    labels: [
      {
        id: "68f8f78e4d0462fee98c880e",
        probability: 1,
        source: {
          user_id: "8f11574e-5dc9-4805-88ef-1f974c974d49",
          model_id: null,
          model_storage_id: null,
        },
      },
    ],
    labels_to_revisit: [],
    shape: {
      type: "POLYGON",
      points: [
        {
          x: 1357,
          y: 663,
        },
        {
          x: 1386,
          y: 680,
        },
        {
          x: 1400,
          y: 694,
        },
        {
          x: 1414,
          y: 716,
        },
        {
          x: 1422,
          y: 723,
        },
        {
          x: 1428,
          y: 743,
        },
        {
          x: 1428,
          y: 775,
        },
        {
          x: 1425,
          y: 795,
        },
        {
          x: 1420,
          y: 809,
        },
        {
          x: 1402,
          y: 834,
        },
        {
          x: 1383,
          y: 847,
        },
        {
          x: 1356,
          y: 860,
        },
        {
          x: 1333,
          y: 864,
        },
        {
          x: 1292,
          y: 861,
        },
        {
          x: 1282,
          y: 855,
        },
        {
          x: 1267,
          y: 832,
        },
        {
          x: 1253,
          y: 823,
        },
        {
          x: 1243,
          y: 812,
        },
        {
          x: 1221,
          y: 804,
        },
        {
          x: 1217,
          y: 800,
        },
        {
          x: 1206,
          y: 765,
        },
        {
          x: 1206,
          y: 742,
        },
        {
          x: 1212,
          y: 717,
        },
        {
          x: 1220,
          y: 706,
        },
        {
          x: 1223,
          y: 697,
        },
        {
          x: 1236,
          y: 682,
        },
        {
          x: 1253,
          y: 670,
        },
        {
          x: 1269,
          y: 662,
        },
        {
          x: 1298,
          y: 654,
        },
        {
          x: 1322,
          y: 654,
        },
      ],
    },
  },
];
