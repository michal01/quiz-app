# Zadanie

Przygotuj aplikację pozwalającą na rozwiązanie testu jednokrotnego wyboru przy użyciu Vue 3.
Postępy implementacji dokumentuj przesyłając kod do repozytorium np. na Github.
1. Aplikacja powinna pobierać zbiór pytań z pliku (w dowolnym formacie twojego pomysłu) lub dowolnego innego źródła np. z bazy danych lub API
2. Kolejność pytań oraz odpowiedzi powinna być losowana przy rozpoczęciu testu.
3. Po zakończeniu testu prezentować ilość poprawnych odpowiedzi i / lub wskazywać pytania na które udzielono poprawną / niepoprawną odpowiedź lub wskazywać poprawne / niepoprawne odpowiedzi


# Project launch

To start project, run the following commands in your terminal:

```bash
npm install
npm run dev
```


To start json-server for API requests, run the following command in a new terminal:

```bash
npx json-server --watch api/db.json
```
This will start the MOCK REST API server on `http://localhost:3000` by default.