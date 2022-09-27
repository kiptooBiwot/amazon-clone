import 'package:amazon_clone/models/user.dart';
import 'package:flutter/cupertino.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
    email: '',
    name: '',
    password: '',
    id: '',
    address: '',
    type: '',
    token: '',
  );

  // Getter
  User get user => _user;

  // Setter
  void setUser(String user) {
    _user = User.fromJson(user);
    notifyListeners();
  }
}
