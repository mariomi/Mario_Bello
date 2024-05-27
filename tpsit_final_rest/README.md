# progetto_finale

# Descrizione del Programma

Il programma è un'applicazione mobile sviluppata con Flutter che gestisce l'autenticazione degli utenti e la visualizzazione di una lista di post. Gli utenti possono effettuare il login, registrarsi e visualizzare una lista di post. Il sistema offre anche la possibilità di filtrare i post in tempo reale in base all'username dell'utente che li ha creati, offrendo così un'esperienza utente più personalizzata e intuitiva.

## Funzionalità Principali

### Autenticazione degli Utenti

```dart
Future<bool> authenticateUser(String username, String password) async { ... }
```
La funzione `authenticateUser` si occupa di autenticare un utente verificando le credenziali fornite. Viene effettuata una chiamata HTTP per inviare le credenziali al server, che restituisce un risultato positivo se le credenziali sono corrette. Una volta autenticato con successo, l'utente viene reindirizzato alla pagina principale dell'applicazione.

### Registrazione degli Utenti

```dart
Future<bool> registerUser(String username, String password, String name, String surname) async { ... }
```
La funzione `registerUser` gestisce la registrazione di un nuovo utente inviando i dati al server tramite una chiamata HTTP. Se la registrazione ha successo, l'utente viene aggiunto al database locale. In caso di errore durante la registrazione, viene visualizzato un messaggio di errore per informare l'utente.

### Visualizzazione dei Post

```dart
Future<List<Post>> fetchPost() async { ... }
```
La funzione `fetchPost` recupera i post dal server tramite una chiamata HTTP e restituisce una lista di oggetti `Post`. Questi post vengono quindi visualizzati nell'applicazione in un elenco.

### Ricerca di Post per Username

```dart
Future<List<Post>> get _filteredPosts async { ... }
```
La variabile `_filteredPosts` filtra i post in base all'username dell'utente che li ha creati. La ricerca avviene in tempo reale tramite un campo di input, consentendo agli utenti di trovare rapidamente i post di un determinato utente.

## Innovazioni del Codice

### Gestione Locale dei Dati Utente

Il programma utilizza un database locale per memorizzare i dati degli utenti registrati. Questo approccio consente di ridurre la dipendenza dal server per l'autenticazione e il recupero dei dati utente, migliorando così le prestazioni e l'esperienza utente complessiva.

### Utilizzo di Cached Network Images

Per migliorare le prestazioni e ridurre il carico sul server, le immagini dei post vengono memorizzate localmente in cache utilizzando la libreria `cached_network_image`. Ciò consente un caricamento più veloce delle immagini e una visualizzazione più fluida dei post, migliorando così l'esperienza dell'utente.

### Ricerca in Tempo Reale dei Post

La funzionalità di ricerca consente agli utenti di filtrare i post in tempo reale in base all'username dell'utente che li ha creati. Questo offre un modo efficiente per trovare rapidamente i post di interesse e rende l'applicazione più intuitiva e user-friendly. La ricerca avviene in modo dinamico, senza dover ricaricare l'intera pagina, migliorando così l'usabilità complessiva dell'applicazione.

# Descrizione del Database

Il database è un componente chiave dell'applicazione, responsabile della memorizzazione e della gestione dei dati degli utenti e dei post. Utilizza il framework Floor per fornire un'interfaccia semplice e intuitiva per interagire con il database SQLite locale.

## Entità del Database

### Utente

```dart
@entity
class Utente {
  Utente({required this.idUtente, required this.cognome, required this.nome, required this.username, required this.password});

  @primaryKey
  final int idUtente;

  final String nome;

  final String cognome;

  final String username;

  final String password;
}
```
L'entità Utente rappresenta un utente all'interno del database. Contiene informazioni come l'ID utente, il nome, il cognome, lo username e la password.

### Post
```dart
@entity
class Post {
  Post({required this.idPost, required this.pathFoto, required this.idutente, required this.contenuto, required this.dataPost});

  @primaryKey
  final int? idPost;

  final String pathFoto;

  @ForeignKey(childColumns: ["idutente"], parentColumns: ["idUtente"], entity: Utente)
  final int? idutente;

  final String contenuto;

  final String dataPost;
}
```
L'entità Post rappresenta un post all'interno del database. Contiene informazioni come l'ID del post, il percorso dell'immagine, l'ID dell'utente che ha creato il post, il contenuto del post e la data di creazione.

## Innovazioni del Database

### Utilizzo di Floor
Il database utilizza il framework Floor per semplificare la gestione dei dati. Floor offre un'API chiara e intuitiva per definire le entità del database, le query e le operazioni CRUD, rendendo più semplice e veloce lo sviluppo di applicazioni che necessitano di una persistenza locale dei dati.

### Relazioni tra Entità
Il database utilizza le annotazioni di Floor per definire relazioni tra entità. Ad esempio, l'entità Post ha una relazione con l'entità Utente, consentendo di associare un post a un utente specifico. Ciò facilita la gestione dei dati correlati e migliora l'organizzazione del database.


## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
