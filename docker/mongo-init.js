db.createUser({
  user: "admin",
  pwd: "CqjUMJX12R",
  roles: [
    {
      role: "readWrite",
      db: "url",
    },
  ],
});
