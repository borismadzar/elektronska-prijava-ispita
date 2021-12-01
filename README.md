# Elektronska prijava ispita

Sistem se sastoji od četiri komponente:
1.	Angular frontend aplikacija studentske službe u kojoj administrativni radnik može da pregleda prijave
2.	Angular frontend aplikacija studentski servis koju studenti koriste da prijave ispit
3.	Express, node js aplikacija preko koje obe frontend aplikacije dobijaju informacije
4.	Mysql baza podataka

Da bi se aplikacija koristila moraju biti pokrenute sve četiri komponente. Postoje dva načina da se aplikacija pokrene.

## Prvi način
Na razvojnoj mašini instalirati sve neophodne tehnologije:
-	MySql 8
-	Angular 11
-	Node 14

Na serveru baze podataka je potrebno kreirati shemu studentska-sluzba. Skripte za kreiranje tabela i dodavanje testnih podataka se nalaze u izvornom kodu projekta u folderu setup.
Nakon toga aplikacije je moguće pokrenuti odgovarajućim komandama:

    cd ".\studentska-sluzba\server"
    start node app.js
    
    cd ".\studentska-sluzba\client"
    start npx ng serve
    
    cd ".\studentska-sluzba\studentski-servis"
    start npx ng serve
Takođe je moguće pokrenuti sve aplikacije pokretanjem .bat skripte runme.bat u korijenom folderu projekta, u kojoj se nalaze iste navedene komande.

## Drugi način
Drugi način je da se aplikacije pokreću u docker kontejnerima. Prednost ovog pristupa što nije neophodno na razvojnoj mašini imati sve neophodne zavisne tehnologije osim dockera. Još bitnije je da se kreirane slike mogu koristiti i u produkciji bez bojazni da aplikacija neće raditi zbog razlike u konfiguraciji sistema. Konfiguracija sistema je zapisana u izvornom kodu u definicijama docker fajlova.
U folderu svake aplikacije je *dockerfile* koji upisuje docker sliku koju je neophodno napraviti. 

Potreno je izvršiti sljedeće komande da bi se kreirale odgovarajuće slike tj. pokrenuli kontejneri

    docker build -t my-mysql . 
    docker run -d -p 3306:3306 --name my-mysql -e MYSQL_ROOT_PASSWORD=root my-mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    
    docker build -t studentska-sluzba-server .
    docker run -d -p 3000:3000 --name studentska-sluzba-server studentska-sluzba-server
    
    docker build -t studentska-sluzba-client .
    docker run -d -p 5050:80 --name studentska-sluzba-client studentska-sluzba-client
    
    docker build -t studentski-servis .
    docker run -d -p 4040:80 --name studentski-servis studentski-servis
   
Analogno .bat fajlu kreiran je odgovarajući docker-compose.yml u korijenom folderu izvornog koda projekta. Iz komandne linije pozicionirane u korijenom folderu moguće je pokrenuti sledeću komandu:

    docker compose up

koja će postupiti po definiciji docker-compose.yml fajla i kreirati sve slike i kontejnere neophodne za funkcionisanje aplikacije.

Osim mogućnosti kreiranje jednom komandom je moguće ugasiti i obrisati sve slike i kontejnere:

    docker compose down --rmi 'all'
