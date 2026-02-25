require("../utils/loadEnv");
const { Client } = require("pg");

const SQL = `
  DROP TABLE IF EXISTS teams, projects, assignments, departments, employees;  
  
  CREATE TABLE 
    employees (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      firstname VARCHAR(64),
      lastname VARCHAR(64),
      role VARCHAR(64),
      hire_date DATE
    );

  CREATE TABLE 
    departments (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(64),
      head_id INTEGER,
      CONSTRAINT fk_head
        FOREIGN KEY (head_id)
        REFERENCES employees(id) 
        ON DELETE SET NULL
    );

  CREATE TABLE 
    assignments (
      department_id INTEGER,
      employee_id INTEGER,
      CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id) 
        ON DELETE CASCADE,
      CONSTRAINT fk_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id) 
        ON DELETE CASCADE
    );
    
  CREATE TABLE 
    projects (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(64),
      description VARCHAR(64),
      lead_id INTEGER,
      CONSTRAINT fk_lead
        FOREIGN KEY (lead_id)
        REFERENCES employees(id) 
        ON DELETE SET NULL
    );

  CREATE TABLE 
    teams (
      project_id INTEGER,
      employee_id INTEGER,
      CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id) 
        ON DELETE CASCADE,
      CONSTRAINT fk_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id) 
        ON DELETE CASCADE
    );

  INSERT INTO employees
    (firstname,     lastname,     role,                     hire_date)
  VALUES
    ('John',        'Smith',      'Software Engineer',      '2020-01-15'),
    ('Emma',        'Johnson',    'Product Manager',        '2019-03-22'),
    ('Michael',     'Williams',   'DevOps Engineer',        '2021-06-10'),
    ('Sarah',       'Brown',      'Data Analyst',           '2020-11-05'),
    ('Jessica',     'Garcia',     'Backend Developer',      '2021-09-12'),
    ('David',       'Jones',      'Frontend Developer',     '2022-02-18'),
    ('Robert',      'Miller',     'QA Engineer',            '2020-07-20'),
    ('Laura',       'Davis',      'UX Designer',            '2019-12-01'),
    ('James',       'Rodriguez',  'Systems Administrator',  '2021-04-15'),
    ('Patricia',    'Martinez',   'Security Engineer',      '2020-05-28'),
    ('Christopher', 'Hernandez',  'Software Architect',     '2018-10-10'),
    ('Jennifer',    'Lopez',      'Technical Lead',         '2019-08-14'),
    ('Daniel',      'Gonzalez',   'Junior Developer',       '2022-01-20'),
    ('Linda',       'Wilson',     'Database Administrator', '2020-03-09'),
    ('Matthew',     'Anderson',   'Frontend Developer',     '2021-07-22'),
    ('Barbara',     'Taylor',     'Business Analyst',       '2019-11-30'),
    ('Anthony',     'Thomas',     'Cloud Architect',        '2020-09-16'),
    ('Susan',       'Moore',      'Scrum Master',           '2021-02-11'),
    ('Donald',      'Jackson',    'Software Engineer',      '2022-04-05'),
    ('Jessica',     'Martin',     'Data Engineer',          '2020-12-14'),
    ('Steven',      'Lee',        'Frontend Developer',     '2021-10-19'),
    ('Karen',       'Perez',      'UI Designer',            '2019-06-21'),
    ('Paul',        'Thompson',   'Backend Developer',      '2020-08-27'),
    ('Nancy',       'White',      'Product Owner',          '2019-04-18'),
    ('Mark',        'Harris',     'DevOps Engineer',        '2021-03-12'),
    ('Lisa',        'Martin',     'Quality Assurance',      '2020-10-08'),
    ('Donald',      'Clark',      'Network Engineer',       '2021-05-25'),
    ('Betty',       'Sanchez',    'Systems Analyst',        '2020-02-13'),
    ('Steven',      'Morris',     'Junior Developer',       '2022-03-17'),
    ('Margaret',    'Rogers',     'Technical Writer',       '2019-09-29'),
    ('Ashley',      'Rice',       'Software Engineer',      '2021-01-06'),
    ('Kevin',       'Berry',      'Frontend Developer',     '2020-06-19'),
    ('Kimberly',    'Grant',      'Backend Developer',      '2021-11-23'),
    ('Edward',      'Stone',      'DevOps Engineer',        '2020-04-14'),
    ('Donna',       'Fowler',     'Solutions Architect',    '2019-07-11'),
    ('Ronald',      'Kidd',       'Software Engineer',      '2022-05-09'),
    ('Carol',       'Sherman',    'Data Scientist',         '2020-01-30'),
    ('Timothy',     'Weaver',     'Frontend Developer',     '2021-08-24'),
    ('Sandra',      'Teague',     'Product Manager',        '2019-02-15'),
    ('Jason',       'Parks',      'Backend Developer',      '2020-11-19'),
    ('Shirley',     'Cole',       'QA Engineer',            '2021-12-03'),
    ('Jeffrey',     'Byrd',       'Junior Developer',       '2022-02-28'),
    ('Cynthia',     'Dalton',     'UX Researcher',          '2020-09-09'),
    ('Ryan',        'Barton',     'Security Engineer',      '2019-05-22'),
    ('Kathleen',    'Holden',     'DevOps Engineer',        '2021-06-16'),
    ('Jacob',       'Maldonado',  'Software Engineer',      '2020-03-31'),
    ('Shirley',     'Crosby',     'Database Administrator', '2019-10-24'),
    ('Gary',        'Bridges',    'Frontend Developer',     '2021-09-07'),
    ('Angela',      'Benson',     'Backend Developer',      '2020-07-13'),
    ('Nicholas',    'Wilkinson',  'Cloud Engineer',         '2022-01-14'),
    ('Brenda',      'Dougherty',  'Technical Lead',         '2019-12-20');

    INSERT INTO departments 
      (name,          head_id)
    VALUES
      ('Engineering', 1),
      ('Product',     2),
      ('Operations',  3),
      ('Design',      8),
      ('Security',    10);

    INSERT INTO assignments 
      (department_id, employee_id)
    VALUES
      (1,             1), 
      (1,             5), 
      (1,             6), 
      (1,             13), 
      (1,             19), 
      (1,             29), 
      (1,             31), 
      (1,             36),
      (2,             2), 
      (2,             16), 
      (2,             39), 
      (2,             44),
      (3,             3), 
      (3,             9), 
      (3,             14), 
      (3,             27), 
      (3,             28), 
      (3,             34),
      (4,             8), 
      (4,             22), 
      (4,             43),
      (5,             10), 
      (5,             43), 
      (5,             45);

    INSERT INTO projects 
      (name,                  description,          lead_id)
    VALUES
      ('Mobile App',          'Native iOS/Android', 12),
      ('Cloud Migration',     'Move to AWS',        17),
      ('Analytics Platform',  'Data dashboards',    37),
      ('Security Audit',      'Compliance review',  10),
      ('API Redesign',        'REST to GraphQL',    6);

    INSERT INTO teams 
      (project_id,  employee_id)
    VALUES
      (1,           1),
      (1,           5),
      (1,           15),
      (1,           21),
      (2,           3), 
      (2,           17),
      (2,           25),
      (2,           34),
      (3,           4), 
      (3,           20),
      (3,           36),
      (4,           10),
      (4,           43),
      (4,           45),
      (5,           6),
      (5,           23),
      (5,           33),
      (5,           40);
`;

(async () => {
  try {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Seeding successful");
  } catch (error) {
    console.log(`${error}`);
    throw new Error();
  }
})();
