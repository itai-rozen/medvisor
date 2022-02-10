import React from 'react'
import Button from './../../Button/Button'
import './disclaimer.css'
const Disclaimer = ({ setShowDisclaimer }) => {
  return <div className="disclaimer">

      <p>
אינטרקציות בין תרופתיות הן בהרבה מקרים תיאורטיות ולאו דווקא משקפות את מה שמתרחש בפועל. אין בכתוב שום הוראה להפסקת נטילה או כל פעולה שנוגדת את הוראות הרופא. במידה וקיים חשש יש להתייעץ עם הרופא.
      </p>
      <div id="disc-btn-container">
      <Button content="הבנתי" oncClickFunc={() => setShowDisclaimer(false)} />
      </div>
  </div>
}

export default Disclaimer

// DrugBank is intended for educational and scientific research purposes only and you expressly
// acknowledge and agree that use of DrugBank is at your sole risk. The accuracy of DrugBank
// information is not guaranteed and reliance on DrugBank shall be at your sole risk. DrugBank is not
// intended as a substitute for professional medical advice, diagnosis or treatment.[www.drugbank.ca]"
