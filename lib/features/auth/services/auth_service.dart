import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/global_variables.dart';
import 'package:amazon_clone/constants/show_snackbar.dart';
import 'package:amazon_clone/models/user.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

class AuthService {
  // Sign up user

  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(
        email: email,
        name: name,
        password: password,
        id: '',
        address: '',
        type: '',
        token: '',
      );
//$uri
      http.Response res = await http.post(Uri.parse('$uri/api/v1/auth/signup'),
          body: user.toJson(),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          });
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            showSnackBar(
                context, 'Your account has been created. Login to proceed');
          });
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
