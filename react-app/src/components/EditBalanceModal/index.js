import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import {addToUserBalance} from '../../store/session'
import './EditBalanceModal.css'


function EditBalanceModal(userId){
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const history = useHistory()
    const userIdNumber = userId.userId

    const [cardHolder, setCardHolder] = useState('')
    const [cardType, setCardType] = useState('Visa')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationMonth, setExpirationMonth] = useState('')
    const [expirationYear, setExpirationYear] = useState(2023)
    const [cvc, setCvc] = useState('')
    const [balance, setBalance] = useState()
    const [errors, setErrors] = useState([])



    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        const formErrors = []

        if(!(/^[A-Za-z\s]*$/.test(cardHolder))){
            formErrors.push('Invalid card holder name')
         }

        if((cardType === "Visa" || cardType === "MasterCard") && cardNumber.toString().length !== 16){
            formErrors.push('Invalid card number')
        }
        if(cardType === "Amex" && cardNumber.toString().length !== 15){
            formErrors.push('Invalid card number')
        }
        if(expirationMonth < 1 || expirationMonth > 12){
            formErrors.push("Invalid expiration month")
        }
        if(expirationYear < 2023){
            formErrors.push("Invalid expiration year")
        }
        if(cvc.toString().length !== 3){
            formErrors.push( "Invalid CVC number")
        }
        if(balance < 0){
            formErrors.push("Invalid deposit amount")
        }

        if(formErrors.length){
            setErrors(formErrors)
            return

        }else{
        const payload = {
            balance
        }
        const addedBalance = await dispatch(addToUserBalance(payload, userIdNumber))

        if(addedBalance){
            (closeModal)
            (history.push(`/users/${userIdNumber}`))
        }
        }
    }


    return (
        <div id='edit-balance-container'>
        <form id= 'edit-balance-form' onSubmit={handleSubmit}>
            <h2 id='edit-balance-title'>Enter payment method </h2>

            <div id='balance-form-errors'>
                {errors.map(error => (

                      <div key={error}>{error}</div>
                ))}
            </div>

            <div className='balance-form-inputs'>
                <label id="edit-balance-label">Card Holder name</label>
              <input
                type='test'
                required
                onChange={(e) => setCardHolder(e.target.value)}
                value={cardHolder}
                name="CardHolder Name"
                className= 'edit-balance-form-input'
              />
            </div>
            <div className='balance-form-inputs'>
                <label id="edit-balance-label">Card type</label>
              <select
                required
                onChange={(e) => setCardType(e.target.value)}
                value={cardType}
                name="balance"
                className= 'edit-balance-form-input'
                id='card-type-select'
              >
                <option value='Visa'>Visa</option>
                <option value='MasterCard'>MasterCard</option>
                <option value='Amex'>Amex</option>
              </select>
            </div>

            <div className='balance-form-inputs'>
                <label id="edit-balance-label">Credit/Debit card number</label>
              <input
                type='number'
                pattern="[0-9]*"
                required
                onChange={(e) => setCardNumber(e.target.value)}
                value={cardNumber}
                name="balance"
                className= 'edit-balance-form-input'
              />
            </div>
            <div id='card-details'>
                <div className='balance-form-date-inputs'>
                    <label id="edit-balance-label">Expiration month</label>
                  <input
                    type='number'
                    pattern="[0-9]*"
                    required
                    onChange={(e) => setExpirationMonth(e.target.value)}
                    value={expirationMonth}
                    name="balance"
                    className= 'edit-balance-card-input'
                  />
                </div>

                <div className='balance-form-date-inputs'>
                    <label id="edit-balance-label">Expiration year</label>
                  <input
                    type='number'
                    pattern="[0-9]*"
                    required
                    onChange={(e) => setExpirationYear(e.target.value)}
                    value={expirationYear}
                    name="balance"
                    className= 'edit-balance-card-input'
                  />
                </div>
            </div>
            <div className='balance-form-inputs'>
                    <label id="edit-balance-label">CVC</label>
                  <input
                    type='number'
                    pattern="[0-9]*"
                    required
                    onChange={(e) => setCvc(e.target.value)}
                    value={cvc}
                    name="balance"
                    className= 'edit-balance-form-input'
               />
                </div>

            <div className='balance-form-inputs'>
                <label id="edit-balance-label">Amount $</label>
              <input
                type='number'

                required
                onChange={(e) => setBalance(e.target.value)}
                value={balance}
                name="balance"
                className= 'edit-balance-form-input'
              />
            </div>

          <button id="edit-balance-button" type='submit'>Confirm</button>


        </form>
        </div>
    )

}

export default EditBalanceModal
