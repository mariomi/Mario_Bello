import 'package:floor/floor.dart';
import 'model.dart';

@dao
abstract class UserDao {
  @Query('SELECT * FROM Users WHERE username = :username OR Email = :email')
  Future<User?> findUserByUsernameOrEmail(String username, String email);

  @Query('SELECT * FROM Users')
  Future<List<User>> findAllUsers();

  @Query('SELECT * FROM Users WHERE UserID = :id')
  Future<User?> findUserById(int id);

  @insert
  Future<void> insertUser(User user);

  @update
  Future<void> updateUser(User user);

  @delete
  Future<void> deleteUser(User user);
}

@dao
abstract class AnimalDao {
  @Query('SELECT * FROM Animals WHERE Species = :species')
  Future<List<Animal>> findAnimalBySpecies(String species);

  @Query('SELECT * FROM Animals')
  Future<List<Animal>> findAllAnimals();

  @Query('SELECT * FROM Animals WHERE AnimalID IN (SELECT AnimalID FROM Adoptions WHERE UserID = :userId)')
  Future<List<Animal>> findAdoptedAnimalsByUserId(int userId);

  @insert
  Future<void> insertAnimal(Animal animal);

  @update
  Future<void> updateAnimal(Animal animal);

  @delete
  Future<void> deleteAnimal(Animal animal);
}

@dao
abstract class TodoDao {
  @Query('SELECT * FROM Todos')
  Future<List<Todo>> findAllTodos();

  @Query('SELECT * FROM Todos WHERE id = :id')
  Future<Todo?> findTodoById(int id);

  @insert
  Future<void> insertTodo(Todo todo);

  @update
  Future<void> updateTodo(Todo todo);

  @delete
  Future<void> deleteTodo(Todo todo);
}
