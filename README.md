# Watchlist

Kleine Watchlist-Web-App, mit der man Filme & Serien verwalten kann.

- Backend: Spring Boot (REST API, JPA)
- Frontend: Vue 3 + Vite (eigenes Repo)
- Datenbank: PostgreSQL (Render)
- Hosting: Render 
- CI: GitHub Actions (Backend- und Frontend-Tests)

---

## Live-URLs

- **Backend API:**  
  `https://watchlist-vuih.onrender.com/api/watchlist`

- **Frontend (Vue):**  
  `https://watchlist-frontend-z54k.onrender.com`

Das Frontend ruft die API des Backends auf, um Einträge zu laden, anzulegen und zu löschen.

---

## Features / Use-Cases

Aktuell unterstützt die App u. a. folgende Anwendungsfälle:

1. **Watchlist anzeigen**  
   Beim Laden der Seite werden alle Einträge aus der Datenbank per `GET /api/watchlist` geladen und als Liste angezeigt.

2. **Neuen Eintrag anlegen**  
   Über ein Formular kann man neue Einträge mit Titel, Typ (Film/Serie), Bewertung (1–10) und Status (gesehen/ungesehen) anlegen.  
   → `POST /api/watchlist`

3. **Einträge löschen**  
   Zu jedem Eintrag gibt es einen Löschen-Button.  
   → `DELETE /api/watchlist/{id}`

4. **Bewertung speichern & anzeigen**  
   Jeder Eintrag kann eine Bewertung von 1–10 haben, die gespeichert und in der Liste angezeigt wird.

5. **Typ Film/Serie speichern & anzeigen**  
   Einträge können als „Film“ oder „Serie“ markiert werden und werden entsprechend dargestellt.

6. **Gesehen-/ungesehen-Status**  
   Einträge können als „gesehen“ markiert werden; in der Liste wird der Status angezeigt.

7. **Filter „Nur ungesehene anzeigen“**  
   Im Frontend kann die Liste so gefiltert werden, dass nur Einträge mit Status „offen“ angezeigt werden.

---

## Architekturüberblick

- **Spring Boot Backend**
    - `WatchItem` als JPA-Entity
    - `WatchItemRepository` als `JpaRepository<WatchItem, Long>`
    - `WatchlistService` kapselt die Geschäftslogik (CRUD + einfache Validierung)
    - `WatchlistController` stellt eine REST-API unter `/api/watchlist` bereit

- **REST-API**
    - `GET /api/watchlist` – alle Einträge aus der Datenbank
    - `POST /api/watchlist` – neuen Eintrag erstellen
    - `DELETE /api/watchlist/{id}` – Eintrag löschen

- **Vue-Frontend**
    - `App.vue` enthält die Hauptlogik (Laden, Speichern, Löschen, Filter)
    - `WatchItemForm.vue` ist das Formular zum Anlegen neuer Einträge
    - `ItemList.vue` rendert die Liste mit `v-for` und Delete-Buttons

---

## Datenbank & Environment-Variablen

Die App verwendet eine PostgreSQL-Datenbank (Render).

Die DB-Credentials werden **nicht im Klartext im Code gespeichert**, sondern als Environment-Variablen:

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
