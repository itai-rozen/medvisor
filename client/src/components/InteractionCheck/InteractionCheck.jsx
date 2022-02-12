import React, {useState, useEffect} from 'react'
import Button from './../Button/Button'
import Spinner from './../Spinner/Spinner'
import axios from 'axios'
import './interactionCheck.css'
import Disclaimer from './Disclaimer/Disclaimer'

const InteractionCheck = ({ medicines, setShowInteractionsModal }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [rxString, setRxString] = useState('')
  const [drugInteractions, setDrugInteractions] = useState([])
  const [error, setError] = useState('')

  const getDrugNameByRxId = rxId => {
    const medicineObj =  medicines.find(med => med.rxId === rxId)
    return medicineObj.drugName
  }
  const generateRxString = () => {
    const rxArr = medicines.map(med => med.rxId)
    console.log('meds ex id array: ', rxArr)
    const str = rxArr.join('+')
    console.log('string of rxcuis: ',str)
    setRxString(str)
  }

  const fetchInteractions = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxString}&sources=ONCHigh `)
      const interactionPairArr = data?.fullInteractionTypeGroup[0].fullInteractionType
      const minConcepts = interactionPairArr?.map(int => int.minConcept)
      const interactionPairs = interactionPairArr?.map(int => int.interactionPair)
      const rxPairs = minConcepts?.map(drug => drug?.map(dr => dr.rxcui))
      const interactionArrPairs = interactionPairs.map(int => int.map(i => {
        return {
          severity: i.severity, description: i.description 
        }
      }))
      console.log('min concepts: ',rxPairs) 
      extractInteractionArr(rxPairs, interactionArrPairs)
      setIsLoading(false)
    } catch(err){
      setError('לא נמצאו אינטרקציות')
      setIsLoading(false)
    }
  }

  const extractInteractionArr = (rxs, interactions) => {
    const displayArr = []
    rxs.forEach((rx,i) => {
      const displayObj = {}  
      const drugPair = rx.map(singleRx => getDrugNameByRxId(singleRx))
        console.log('drug names pair: ',drugPair)
      displayObj.names = drugPair.join(' + ')
      displayObj.severity = interactions[i][0].severity
      displayObj.description = interactions[i][0].description
      displayArr.push(displayObj)
    })
    console.log('array of interactions to display: ', displayArr)
    setDrugInteractions([...new Set(displayArr)])
  }

  useEffect(() => {
    generateRxString()
    if (rxString)   fetchInteractions()
  }, [rxString])

return <div className="interactions-container">

<div className="interactions-modal modal">
  <ul className="interaction-headers">
    <li className="interaction-item">התרופות</li>
    <li className="interaction-item">אינטרקציה</li>
    <li className="interaction-item">חומרה</li>
  </ul>
  {
  drugInteractions.map(interaction => {
    return <ul key={interaction.description} className='interaction-detail-list'>
      <li className="interaction-detail-item">{interaction.names}</li>
      <li className="interaction-detail-item">{interaction.description}</li>
      <li className="interaction-detail-item">{interaction.severity}</li>
    </ul>
  })
  }

  {showDisclaimer && <div className="disclaimer-container">  <Disclaimer setShowDisclaimer={setShowDisclaimer} /></div>}
  <button onClick={() => setShowInteractionsModal(false)} >X</button>
  <div className="message">{error}</div>

</div>
  {isLoading && <Spinner />}
</div>
}

export default InteractionCheck