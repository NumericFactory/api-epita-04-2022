import * as admin from 'firebase-admin'

class CustomerRepository {
  create(customer:any) {
    return admin.firestore().collection('customers').add(customer)
  }
  read() {
    return admin.firestore().collection('customers').get()
  }
  update(id:any, customer:any) {
    return admin.firestore().collection('customers').doc(id).update(customer)
  }
  delete(id:any) {
    return admin.firestore().collection('customers').doc(id).delete()
  }
  find(id:any) {
    return admin.firestore().collection('customers').doc(id).get()
  }

  findEvents(customerId:any) {
    return admin.firestore().collection('customers').doc(customerId).collection('events').get()
  }
}

export default new CustomerRepository()