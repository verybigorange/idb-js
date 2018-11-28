export default {
  dbName: "student",
  version: 1,
  tables: [
    {
      tableName: "grade",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option:{
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "score",
        }
      ]
    },
    {
      tableName: "info",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option:{
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "age"
        },
        {
          key: "sex"
        }
      ]
    }
  ]
};
