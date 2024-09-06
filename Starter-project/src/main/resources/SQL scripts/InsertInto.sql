INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (1, 'Inzenjerstvo informacionih sistema', 'IT');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (2, 'Softversko inzenjerstvo', 'SI');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (3, 'Racunarstvo i automatika', 'RA');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (4, 'Primenjeno softversko inzenjerstvo', 'EE');

--Test
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (-100, 'Test', 'Test');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (-50, 'Test', 'Test');

INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (1, 'Projekat 1', 'P1', 'Projekat na smeru IT');
INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (2, 'Projekat 2', 'P2', 'Projekat na smeru SI');
INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (3, 'Projekat 3', 'P3', 'Projekat na smeru RA');
INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (4, 'Projekat 4', 'P4', 'Projekat na smeru EE');

--Test
INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (-100, 'Test', 'Test', 'Test');
INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (-50, 'Test', 'Test', 'Test');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (1, 'Grupa 1.', 1);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (2, 'Grupa 2.', 1);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (3, 'Grupa 1.', 2);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (4, 'Grupa 2.', 2);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (5, 'Grupa 1.', 3);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (6, 'Grupa 2.', 3);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (7, 'Grupa 1.', 4);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (8, 'Grupa 2.', 4);

--Test
INSERT INTO "grupa"("id", "oznaka", "smer") VALUES (-100, 'Test', -50);
INSERT INTO "grupa"("id", "oznaka", "smer") VALUES (-50, 'Test', -50);

INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (1, 'Petar', 'Petrovic', 'IT1/2018', 1, 1);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (2, 'Marko', 'Markovic', 'IT2/2018', 2, 1);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (3, 'Janko', 'Jankovic', 'SI1/2018', 3, 2);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (4, 'Nikola', 'Nikolic', 'SI2/2018', 4, 2);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (5, 'Marija', 'Markovic', 'RA1/2018', 5, 3);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (6, 'Ivana', 'Ivanovic', 'RA2/2018', 6, 3);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (7, 'Luka', 'Lukic', 'EE1/2018', 7, 4);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (8, 'Nikolina', 'Lazic', 'EE2/2018', 8, 4);

--Test
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat") VALUES (-100, 'Test', 'Test', 'Test', -50, -50);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat") VALUES (-50, 'Test', 'Test', 'Test', -50, -50);