CREATE TABLE matches(
    id INT PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    match_date DATE,
    player_of_match VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    neutral_venue VARCHAR(255) NOT NULL,
    team1 VARCHAR(255) NOT NULL,
    team2 VARCHAR(255) NOT NULL,
    toss_winner VARCHAR(255) NOT NULL,
    toss_decision VARCHAR(255) NOT NULL,
    winner VARCHAR(255) NOT NULL,
    result VARCHAR(255) NOT NULL,
    result_margin VARCHAR(255) NOT NULL,
    eliminator VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL, 
    umpire1 VARCHAR(255) NOT NULL,
    umpire2 VARCHAR(255) NOT NULL
);

C:\Users\mings\Desktop\IPL Matches 2008-2020.csv

COPY matches(id,city,match_date,player_of_match,venue,neutral_venue,team1,team2,toss_winner,toss_decision,winner,result,result_margin,eliminator,method,umpire1,umpire2)
FROM 'C:\Users\hp\Desktop\IPL Matches 2008-2020.csv'
DELIMITER ','
CSV HEADER;
C:\Users\hp\Downloads\IPL Matches 2008-2020.csv

 CREATE TABLE ball_by_ball (
 id VARCHAR(255) NOT NULL,
 inning VARCHAR(255) NOT NULL,
 over VARCHAR(255) NOT NULL,
 ball VARCHAR(255) NOT NULL,
 batsman VARCHAR(255) NOT NULL,
 non_striker VARCHAR(255) NOT NULL,
 bowler VARCHAR(255) NOT NULL,
 batsman_runs VARCHAR(255) NOT NULL,
 extra_runs VARCHAR(255) NOT NULL,
 total_runs VARCHAR(255) NOT NULL,
 non_boundary VARCHAR(255) ,
 is_wicket VARCHAR(255) NOT NULL,
 dismissal_kind VARCHAR(255) ,
 player_dismissed VARCHAR(255) ,
 fielder VARCHAR(255) ,
 extra_type VARCHAR(255) ,
 batting_team VARCHAR(255) NOT NULL,
 bowling_team VARCHAR(255) NOT NULL
);

ALTER TABLE ball_by_ball ADD COLUMN p_key BIGSERIAL PRIMARY KEY;

COPY ball_by_ball
FROM 'C:\Users\mings\Desktop\IPL Ball-by-Ball 2008-2020.csv'
DELIMITER ','
CSV HEADER;







