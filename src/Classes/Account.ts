import { firebaseApp } from "../db";
import store from "@/store";
export class Account {
  // bruh stop using any 
  user: any;
  constructor(user?: any) {
    this.user = user;
  }
  login(userInput: UserInput) {
    if (userInput.username != "" && userInput.password != "") {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function(error) {
          console.log(error.code, error.message);
        });
    }
  }
  async signOut() {
    return await firebaseApp
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        store.commit("setUser", Object());
      })
      .catch(function(error) {
        console.log("Oops... an error occured", error);
      });
  }
  createNewUser(userInput: UserInput) {
    if (userInput.username != "" && userInput.password != "") {
      // TODO:  Make an if stament to verfify no duplicate users by checking the database
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function(error) {
          console.error(error.code, error.message);
        });
    } else {
      console.log("Please type in a valid username and password");
    }
  }
  changeUserProfile(userChanges: string) {
    console.log(userChanges);
    this.user
      .updateProfile({
        displayName: userChanges,
      })
      .then(function() {
        // Update successful.
      })
      .catch(() => {
        console.error("There was a problem chaning your profile");
        // An error happened.
      });
  }
}

export interface UserInput {
  username: string;
  password: string;
}

export interface UserChanges {
  displayName: string;
}
