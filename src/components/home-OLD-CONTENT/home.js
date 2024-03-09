import TanstackProvider from '@/providers/TanstackProvider'
import LoginSection from '../signIn/LoginSection'

const Home = ( {content} ) => {

      
 return (
 <section id="home"> 

          <div className="home-content">
          
            <div id="home-top">
                <div className="home-title">
                    <div className="white-background-title">

                      <div>BART MULLER</div>
                      
                      <div className="info-background-animate">
                        <div className="home-info">

                          <div> Tel. 781&nbsp;341&nbsp;781 </div>
                          <div> Ul. Grunwaldzka&nbsp;176A </div>

                        </div>
                        <div className="hide">
                        BARBER <br/>
                        SHOP
                        </div>
                        
                      </div>
                      

                    </div>

                    <div className="none-bg">
                      BART MULLER <br/>
                      BARBER <br/>
                      SHOP

                    </div> 
                </div>
            
                <div className="home-text">
                  <div>{content.witaj}</div>
                </div>

                <div className="home-buttons">
                  <div className="btn-kontakt button"> KONTAKT </div>
                </div>
                
              </div>

              <div className="home-bottom centred">
                <a className="centred" href="#omnie">
                  <div className="arrow-title"> O mnie </div>
                  <img src="/images/arrow.png" alt="Strzałka w dół - Przewiń w dół do sekcji O mnie" />
                </a>  
              </div>

          </div>

          
          
          <aside id="login" className="home-img">
            <TanstackProvider>
              <LoginSection/>
            </TanstackProvider>
            <nav>
              <a href="#cennik">CENNIK</a>
              <a href="#omnie">O&nbsp;MNIE</a>
              <a className="nav-section" href="#home-top">HOME</a>
            </nav>
          </aside>

 </section>

)

}



export default Home