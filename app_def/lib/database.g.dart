// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'database.dart';

// **************************************************************************
// FloorGenerator
// **************************************************************************

// ignore: avoid_classes_with_only_static_members
class $FloorAppDatabase {
  /// Creates a database builder for a persistent database.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static _$AppDatabaseBuilder databaseBuilder(String name) =>
      _$AppDatabaseBuilder(name);

  /// Creates a database builder for an in memory database.
  /// Information stored in an in memory database disappears when the process is killed.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static _$AppDatabaseBuilder inMemoryDatabaseBuilder() =>
      _$AppDatabaseBuilder(null);
}

class _$AppDatabaseBuilder {
  _$AppDatabaseBuilder(this.name);

  final String? name;

  final List<Migration> _migrations = [];

  Callback? _callback;

  /// Adds migrations to the builder.
  _$AppDatabaseBuilder addMigrations(List<Migration> migrations) {
    _migrations.addAll(migrations);
    return this;
  }

  /// Adds a database [Callback] to the builder.
  _$AppDatabaseBuilder addCallback(Callback callback) {
    _callback = callback;
    return this;
  }

  /// Creates the database and initializes it.
  Future<AppDatabase> build() async {
    final path = name != null
        ? await sqfliteDatabaseFactory.getDatabasePath(name!)
        : ':memory:';
    final database = _$AppDatabase();
    database.database = await database.open(
      path,
      _migrations,
      _callback,
    );
    return database;
  }
}

class _$AppDatabase extends AppDatabase {
  _$AppDatabase([StreamController<String>? listener]) {
    changeListener = listener ?? StreamController<String>.broadcast();
  }

  TodoDao? _todoDaoInstance;

  AnimalDao? _animalDaoInstance;

  UserDao? _userDaoInstance;

  Future<sqflite.Database> open(
    String path,
    List<Migration> migrations, [
    Callback? callback,
  ]) async {
    final databaseOptions = sqflite.OpenDatabaseOptions(
      version: 1,
      onConfigure: (database) async {
        await database.execute('PRAGMA foreign_keys = ON');
        await callback?.onConfigure?.call(database);
      },
      onOpen: (database) async {
        await callback?.onOpen?.call(database);
      },
      onUpgrade: (database, startVersion, endVersion) async {
        await MigrationAdapter.runMigrations(
            database, startVersion, endVersion, migrations);

        await callback?.onUpgrade?.call(database, startVersion, endVersion);
      },
      onCreate: (database, version) async {
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Todos` (`id` INTEGER NOT NULL, `name` TEXT NOT NULL, `checked` INTEGER NOT NULL, PRIMARY KEY (`id`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Animals` (`AnimalID` INTEGER NOT NULL, `Name` TEXT NOT NULL, `Species` TEXT NOT NULL, `Breed` TEXT, `Age` INTEGER, `Gender` TEXT NOT NULL, `Description` TEXT, `PhotoUrl` TEXT, `AdoptionStatus` TEXT NOT NULL, `ArrivalDate` TEXT NOT NULL, PRIMARY KEY (`AnimalID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Users` (`UserID` INTEGER, `username` TEXT NOT NULL, `Email` TEXT NOT NULL, `PasswordHash` TEXT NOT NULL, `isAdmin` INTEGER NOT NULL, `RegistrationDate` TEXT NOT NULL, PRIMARY KEY (`UserID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Adoptions` (`AdoptionID` INTEGER NOT NULL, `UserID` INTEGER NOT NULL, `AnimalID` INTEGER NOT NULL, FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON UPDATE NO ACTION ON DELETE NO ACTION, FOREIGN KEY (`AnimalID`) REFERENCES `Animals` (`AnimalID`) ON UPDATE NO ACTION ON DELETE NO ACTION, PRIMARY KEY (`AdoptionID`))');

        await callback?.onCreate?.call(database, version);
      },
    );
    return sqfliteDatabaseFactory.openDatabase(path, options: databaseOptions);
  }

  @override
  TodoDao get todoDao {
    return _todoDaoInstance ??= _$TodoDao(database, changeListener);
  }

  @override
  AnimalDao get animalDao {
    return _animalDaoInstance ??= _$AnimalDao(database, changeListener);
  }

  @override
  UserDao get userDao {
    return _userDaoInstance ??= _$UserDao(database, changeListener);
  }
}

class _$TodoDao extends TodoDao {
  _$TodoDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _todoInsertionAdapter = InsertionAdapter(
            database,
            'Todos',
            (Todo item) => <String, Object?>{
                  'id': item.id,
                  'name': item.name,
                  'checked': item.checked ? 1 : 0
                }),
        _todoUpdateAdapter = UpdateAdapter(
            database,
            'Todos',
            ['id'],
            (Todo item) => <String, Object?>{
                  'id': item.id,
                  'name': item.name,
                  'checked': item.checked ? 1 : 0
                }),
        _todoDeletionAdapter = DeletionAdapter(
            database,
            'Todos',
            ['id'],
            (Todo item) => <String, Object?>{
                  'id': item.id,
                  'name': item.name,
                  'checked': item.checked ? 1 : 0
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<Todo> _todoInsertionAdapter;

  final UpdateAdapter<Todo> _todoUpdateAdapter;

  final DeletionAdapter<Todo> _todoDeletionAdapter;

  @override
  Future<List<Todo>> findAllTodos() async {
    return _queryAdapter.queryList('SELECT * FROM Todos',
        mapper: (Map<String, Object?> row) => Todo(
            id: row['id'] as int,
            name: row['name'] as String,
            checked: (row['checked'] as int) != 0));
  }

  @override
  Future<Todo?> findTodoById(int id) async {
    return _queryAdapter.query('SELECT * FROM Todos WHERE id = ?1',
        mapper: (Map<String, Object?> row) => Todo(
            id: row['id'] as int,
            name: row['name'] as String,
            checked: (row['checked'] as int) != 0),
        arguments: [id]);
  }

  @override
  Future<void> insertTodo(Todo todo) async {
    await _todoInsertionAdapter.insert(todo, OnConflictStrategy.abort);
  }

  @override
  Future<void> updateTodo(Todo todo) async {
    await _todoUpdateAdapter.update(todo, OnConflictStrategy.abort);
  }

  @override
  Future<void> deleteTodo(Todo todo) async {
    await _todoDeletionAdapter.delete(todo);
  }
}

class _$AnimalDao extends AnimalDao {
  _$AnimalDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _animalInsertionAdapter = InsertionAdapter(
            database,
            'Animals',
            (Animal item) => <String, Object?>{
                  'AnimalID': item.AnimalID,
                  'Name': item.Name,
                  'Species': item.Species,
                  'Breed': item.Breed,
                  'Age': item.Age,
                  'Gender': item.Gender,
                  'Description': item.Description,
                  'PhotoUrl': item.PhotoUrl,
                  'AdoptionStatus': item.AdoptionStatus,
                  'ArrivalDate': item.ArrivalDate
                }),
        _animalUpdateAdapter = UpdateAdapter(
            database,
            'Animals',
            ['AnimalID'],
            (Animal item) => <String, Object?>{
                  'AnimalID': item.AnimalID,
                  'Name': item.Name,
                  'Species': item.Species,
                  'Breed': item.Breed,
                  'Age': item.Age,
                  'Gender': item.Gender,
                  'Description': item.Description,
                  'PhotoUrl': item.PhotoUrl,
                  'AdoptionStatus': item.AdoptionStatus,
                  'ArrivalDate': item.ArrivalDate
                }),
        _animalDeletionAdapter = DeletionAdapter(
            database,
            'Animals',
            ['AnimalID'],
            (Animal item) => <String, Object?>{
                  'AnimalID': item.AnimalID,
                  'Name': item.Name,
                  'Species': item.Species,
                  'Breed': item.Breed,
                  'Age': item.Age,
                  'Gender': item.Gender,
                  'Description': item.Description,
                  'PhotoUrl': item.PhotoUrl,
                  'AdoptionStatus': item.AdoptionStatus,
                  'ArrivalDate': item.ArrivalDate
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<Animal> _animalInsertionAdapter;

  final UpdateAdapter<Animal> _animalUpdateAdapter;

  final DeletionAdapter<Animal> _animalDeletionAdapter;

  @override
  Future<List<Animal>> findAnimalBySpecies(String species) async {
    return _queryAdapter.queryList('SELECT * FROM Animals WHERE Species = ?1',
        mapper: (Map<String, Object?> row) => Animal(
            AnimalID: row['AnimalID'] as int,
            Name: row['Name'] as String,
            Species: row['Species'] as String,
            Breed: row['Breed'] as String?,
            Age: row['Age'] as int?,
            Gender: row['Gender'] as String,
            Description: row['Description'] as String?,
            PhotoUrl: row['PhotoUrl'] as String?,
            AdoptionStatus: row['AdoptionStatus'] as String,
            ArrivalDate: row['ArrivalDate'] as String),
        arguments: [species]);
  }

  @override
  Future<List<Animal>> findAllAnimals() async {
    return _queryAdapter.queryList('SELECT * FROM Animals',
        mapper: (Map<String, Object?> row) => Animal(
            AnimalID: row['AnimalID'] as int,
            Name: row['Name'] as String,
            Species: row['Species'] as String,
            Breed: row['Breed'] as String?,
            Age: row['Age'] as int?,
            Gender: row['Gender'] as String,
            Description: row['Description'] as String?,
            PhotoUrl: row['PhotoUrl'] as String?,
            AdoptionStatus: row['AdoptionStatus'] as String,
            ArrivalDate: row['ArrivalDate'] as String));
  }

  @override
  Future<List<Animal>> findAdoptedAnimalsByUserId(int userId) async {
    return _queryAdapter.queryList(
        'SELECT * FROM Animals WHERE AnimalID IN (SELECT AnimalID FROM Adoptions WHERE UserID = ?1)',
        mapper: (Map<String, Object?> row) => Animal(AnimalID: row['AnimalID'] as int, Name: row['Name'] as String, Species: row['Species'] as String, Breed: row['Breed'] as String?, Age: row['Age'] as int?, Gender: row['Gender'] as String, Description: row['Description'] as String?, PhotoUrl: row['PhotoUrl'] as String?, AdoptionStatus: row['AdoptionStatus'] as String, ArrivalDate: row['ArrivalDate'] as String),
        arguments: [userId]);
  }

  @override
  Future<void> insertAnimal(Animal animal) async {
    await _animalInsertionAdapter.insert(animal, OnConflictStrategy.abort);
  }

  @override
  Future<void> updateAnimal(Animal animal) async {
    await _animalUpdateAdapter.update(animal, OnConflictStrategy.abort);
  }

  @override
  Future<void> deleteAnimal(Animal animal) async {
    await _animalDeletionAdapter.delete(animal);
  }
}

class _$UserDao extends UserDao {
  _$UserDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _userInsertionAdapter = InsertionAdapter(
            database,
            'Users',
            (User item) => <String, Object?>{
                  'UserID': item.UserID,
                  'username': item.username,
                  'Email': item.Email,
                  'PasswordHash': item.PasswordHash,
                  'isAdmin': item.isAdmin ? 1 : 0,
                  'RegistrationDate': item.RegistrationDate
                }),
        _userUpdateAdapter = UpdateAdapter(
            database,
            'Users',
            ['UserID'],
            (User item) => <String, Object?>{
                  'UserID': item.UserID,
                  'username': item.username,
                  'Email': item.Email,
                  'PasswordHash': item.PasswordHash,
                  'isAdmin': item.isAdmin ? 1 : 0,
                  'RegistrationDate': item.RegistrationDate
                }),
        _userDeletionAdapter = DeletionAdapter(
            database,
            'Users',
            ['UserID'],
            (User item) => <String, Object?>{
                  'UserID': item.UserID,
                  'username': item.username,
                  'Email': item.Email,
                  'PasswordHash': item.PasswordHash,
                  'isAdmin': item.isAdmin ? 1 : 0,
                  'RegistrationDate': item.RegistrationDate
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<User> _userInsertionAdapter;

  final UpdateAdapter<User> _userUpdateAdapter;

  final DeletionAdapter<User> _userDeletionAdapter;

  @override
  Future<User?> findUserByUsernameOrEmail(
    String username,
    String email,
  ) async {
    return _queryAdapter.query(
        'SELECT * FROM Users WHERE username = ?1 OR Email = ?2',
        mapper: (Map<String, Object?> row) => User(
            UserID: row['UserID'] as int?,
            username: row['username'] as String,
            Email: row['Email'] as String,
            PasswordHash: row['PasswordHash'] as String,
            isAdmin: (row['isAdmin'] as int) != 0,
            RegistrationDate: row['RegistrationDate'] as String),
        arguments: [username, email]);
  }

  @override
  Future<List<User>> findAllUsers() async {
    return _queryAdapter.queryList('SELECT * FROM Users',
        mapper: (Map<String, Object?> row) => User(
            UserID: row['UserID'] as int?,
            username: row['username'] as String,
            Email: row['Email'] as String,
            PasswordHash: row['PasswordHash'] as String,
            isAdmin: (row['isAdmin'] as int) != 0,
            RegistrationDate: row['RegistrationDate'] as String));
  }

  @override
  Future<User?> findUserById(int id) async {
    return _queryAdapter.query('SELECT * FROM Users WHERE UserID = ?1',
        mapper: (Map<String, Object?> row) => User(
            UserID: row['UserID'] as int?,
            username: row['username'] as String,
            Email: row['Email'] as String,
            PasswordHash: row['PasswordHash'] as String,
            isAdmin: (row['isAdmin'] as int) != 0,
            RegistrationDate: row['RegistrationDate'] as String),
        arguments: [id]);
  }

  @override
  Future<void> insertUser(User user) async {
    await _userInsertionAdapter.insert(user, OnConflictStrategy.abort);
  }

  @override
  Future<void> updateUser(User user) async {
    await _userUpdateAdapter.update(user, OnConflictStrategy.abort);
  }

  @override
  Future<void> deleteUser(User user) async {
    await _userDeletionAdapter.delete(user);
  }
}
