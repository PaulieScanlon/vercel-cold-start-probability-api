CREATE TABLE results (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,         
  date        timestamptz,         
  runtime     VARCHAR,
  start_time  DECIMAL,
  end_time    DECIMAL,
  diff        DECIMAL,
  error       BOOL
);
