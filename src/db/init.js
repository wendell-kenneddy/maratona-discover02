const Database = require('./config');

const init = async () => {
  const db = await Database();

  await db.exec(`
    CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    hour_value INT)`
  );

  await db.exec(`
    CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME)`
  );

  await db.run(`
    INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    hour_value
    ) VALUES (
      "Wendell",
      "https://github.com/wendell-kenneddy.png",
      3000,
      5,
      5,
      4,
      50
    );`
  );

  await db.run(`
    INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
    ) VALUES (
      "EXAMPLE JOB",
      3,
      25,
      1623925271075
    );`
  );

  await db.run(`
    INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
    ) VALUES (
      "EXAMPLE JOB_2",
      2,
      50,
      1623925389334
    );`
  );


  await db.close();
};

init();
