import 'package:floor/floor.dart';


@Entity(tableName: 'Users')
class User {
  User({
    required this.UserID,
    required this.username,
    required this.Email,
    required this.PasswordHash,
    required this.isAdmin,
    required this.RegistrationDate,
  });

  @primaryKey
  final int? UserID;

  final String username;
  final String Email;
  final String PasswordHash;
  final bool isAdmin;
  final String RegistrationDate;
}

@Entity(tableName: 'Animals')
class Animal {
  Animal({
    required this.AnimalID,
    required this.Name,
    required this.Species,
    this.Breed,
    this.Age,
    required this.Gender,
    this.Description,
    this.PhotoUrl,
    required this.AdoptionStatus,
    required this.ArrivalDate,
  });

  @primaryKey
  final int AnimalID;

  final String Name;
  final String Species;
  final String? Breed;
  final int? Age;
  final String Gender;
  final String? Description;
  final String? PhotoUrl;
  final String AdoptionStatus;
  final String ArrivalDate;
}

@Entity(
  tableName: 'Adoptions',
  foreignKeys: [
    ForeignKey(childColumns: ['UserID'], parentColumns: ['UserID'], entity: User),
    ForeignKey(childColumns: ['AnimalID'], parentColumns: ['AnimalID'], entity: Animal),
  ],
)
class Adoption {
  Adoption({
    required this.AdoptionID,
    required this.UserID,
    required this.AnimalID,
  });

  @primaryKey
  final int AdoptionID;
  final int UserID;
  final int AnimalID;
}

@Entity(tableName: 'Todos')
class Todo {
  Todo({
    required this.id,
    required this.name,
    this.checked = false,
  });

  @primaryKey
  final int id;

  final String name;
  bool checked;
}
