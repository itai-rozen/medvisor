import React, { useState, useEffect, useReducer } from 'react'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Consumer } from '../../components/Context'
import './about.css'

const About = ({setIsSignup}) => {
    const navigate = useNavigate()

    const updateSignStatusAndRedirect = isSign => {
      setIsSignup(isSign)
      navigate('/auth')
    }

    useEffect(() => {

    }, [])
    return <Consumer >
        {
            c => 
            <div className="about-container">
                <header>
                    <h1 className="header">MedVisor</h1>
                    <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo veritatis corrupti velit hic, accusamus reiciendis quaerat laborum quidem deleniti possimus magnam molestiae provident eaque. Id assumenda et fuga quam aut corrupti animi, non facere quibusdam molestiae cum aliquam enim voluptates voluptas, asperiores modi impedit culpa ea possimus perspiciatis sequi. Quam quos voluptatum accusantium perferendis a dolorum magnam eum voluptas consequatur hic, tempora doloremque dolor ad, reprehenderit corrupti debitis quod. Beatae iste at excepturi ad atque. Dignissimos ratione molestiae, possimus recusandae tempora, alias ipsa suscipit quasi ullam neque temporibus, perferendis consequuntur architecto. Distinctio ut molestiae corporis beatae quo, mollitia assumenda nobis.
                    </p>
                </header>
                <section className="login-section">
                    { 
                     !c.loggedUser.userName ? <>
                            <Button oncClickFunc={() => updateSignStatusAndRedirect(true)} content="הירשם" />
                            <Button oncClickFunc={() => updateSignStatusAndRedirect(false)} content="התחבר" />
                            <Link to="/drugs"><Button content="המשך כאורח" /></Link>
                     </>
                        :   <>
                            <Link to="/drugs"><Button content="לתרופות שלך" /></Link>
                            <Link to="/auth"><Button content="החלף משתמש" /></Link>
                    </>
                }
                </section>

            </div>
        }
    </Consumer>
}

export default About