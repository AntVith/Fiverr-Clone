import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import {addToUserBalance} from '../../store/session'


function EditBalanceModal(userId){
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const history = useHistory()
    const userIdNumber = userId.userId

    const [balance, setBalance] = useState()


    const handleSubmit = async (e) => {
        e.preventDefault()


        const payload = {
            balance
        }
        const addedBalance = await dispatch(addToUserBalance(payload, userIdNumber))

        if(addedBalance){
            (closeModal)
            (history.push(`/users/${userIdNumber}`))
        }
    }


    return (
        <div id='edit-balance-container'>
        <form id= 'edit-balance-form' onSubmit={handleSubmit}>
            <h2 id='edit-balance-title'>Add to your Balance</h2>
            <div id='instructions-edit-balance'>
                <label id="edit-balance-label">Amount $</label>
              <input
                type='number'
                pattern="[0-9]*"
                required
                onChange={(e) => setBalance(e.target.value)}
                value={balance}
                name="balance"
                id= 'edit-balance-form-input'
              />
              </div>
          <button id="edit-balance-button" type='submit'>Confirm</button>


        </form>
        </div>
    )

}

export default EditBalanceModal
