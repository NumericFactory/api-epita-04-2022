import * as admin from 'firebase-admin'


class UserRepository {
  create(user:any) {
    return admin.firestore().collection('users').add(user)
  }
  read() {
    return admin.firestore().collection('users').get()
  }
  update(id:any, user:any) {
    return admin.firestore().collection('users').doc(id).update(user)
  }
  delete(id:any) {
    return admin.firestore().collection('users').doc(id).delete()
  }
  find(id:any) {
    return admin.firestore().collection('users').doc(id).get()
  }
  findByEmail(email:string){
    return admin.firestore().collection('users').doc(email).get()
  }

  findEvents(userId:any) {
    return admin.firestore().collection('users').doc(userId).collection('events').get()
  }
}

export default new UserRepository()