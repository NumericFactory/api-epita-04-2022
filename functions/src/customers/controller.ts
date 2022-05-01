import { Request, Response } from "express";
import CustomerRepository from '../repositories/customers'

class CustomerController {
  // create
  create = async (req: Request, res: Response) => {
      CustomerRepository.create(req.body)
      .then(customer => { res.status(200).json(customer.id) })
      .catch(err => {res.status(500).json(err)})
  }
  // all
  all = async (req: Request, res: Response) => {
      CustomerRepository.read()
        .then(customers => {
          let results:any[] = []
          customers.forEach(customer => results.push({ id: customer.id, customer: customer.data() }))
          if (results.length) {
            res.status(200).json(results)
          } else {
            res.status(404).json({detail: 'No records found'})
          }
        }).catch(err => {res.status(500).json(err)})
  }
  // get
  get = async (req: Request, res: Response) => {
      CustomerRepository.find(req.params.id)
      .then((customer) => {
        if (customer) {   
            CustomerRepository.findEvents(req.params.id)
            .then((events) => {
                let results:any = []
                events.forEach(evt => results.push({id: evt.id, event:evt.data() }));
                res.status(200).json({ 
                    id: customer.id, 
                    customer: customer.data(), 
                    events: results})
            })    
        } else {
            res.status(404).json({detail: '404!'})
        }
      }).catch(err => {res.status(500).json(err)})
  }
  // pactch
  patch = async (req: Request, res: Response) => {
      CustomerRepository.update(req.params.id, req.body)
      .then(customer => { res.status(201).json(customer) })
      .catch(err => {res.status(500).json(err)})
  }
  // delete
  remove = async (req: Request, res: Response) => {
      CustomerRepository.delete(req.params.id) 
      .then(() =>  res.status(200).json({detail: req.params.id, deleted:true }))
      .catch(err => {res.status(500).json(err)})
  }

}

export default new CustomerController()

