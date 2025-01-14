// import FloatingSVGs from './FloatingSVGs';
import './App.css'
import Countdown from './Countdown'
// Import the Countdown component
import Tokenomics from './Tokenomics'

// Import the CSS file for styling

const Grimcutty = () => {
  return (
    <div className="grimcutty-coin">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Grimcutty</h1>
        <nav>
          <a href="#legend">The Legend</a>
          <a href="#awakening">The Awakening</a>
          <a href="#hold">Hold the Coin</a>
          <a href="#community">Join the Community</a>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="hero">
        <h2>Hold the Coin: The Awakening of Grimcutty</h2>
        <p>Summon your strength. Embrace the darkness.</p>
        <button className="cta-button">Buy Grimcutty Coin</button>
      </section>
      <Countdown /> {/* Add the countdown component here */}
      {/* The Legend Section */}
      <section id="legend" className="section legend">
        <h3>The Legend</h3>
        <p>
          In the shadows of the digital realm, Grimcutty Coin holds dark magic. When the last coin
          is sold, the spirit of Grimcutty awakens, but beware— selling your coin is like selling
          your soul to the devil. Are you ready to confront your fears?
        </p>
      </section>
      {/* The Awakening Section */}
      <section id="awakening" className="section awakening">
        <h3>The Awakening</h3>
        <p>
          As the final coins dwindle, a chilling message echoes: “I have awakened. Fear is my
          power.” Grimcutty embodies your deepest fears, challenging you to confront what lurks
          within.
        </p>
      </section>
      <Tokenomics />
      {/* Hold the Coin Section */}
      <section id="hold" className="section hold">
        <h3>Why Hold the Coin?</h3>
        <ul>
          <li>Protection from Fear: Shield yourself from your darkest anxieties.</li>
          <li>Exclusive Events: Access virtual gatherings and share your stories.</li>
          <li>Empowerment Tokens: Earn rewards for confronting your fears.</li>
          <li>Evolving Lore: Influence Grimcutty’s narrative as you hold the coin.</li>
        </ul>
      </section>
      {/* Community Section */}
      <section id="community" className="section community">
        <h3>Join the Community</h3>
        <p>
          Embrace the darkness together! Share your stories, connect with fellow holders, and turn
          fear into strength. Become part of the movement fostering mental health awareness.
        </p>
        <div className="social-icons">
          <a href="#discord">Discord</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </section>
      {/* <GrimcuttyContract/> */}
      {/* <FloatingSVGs/> */}
    </div>
  )
}

export default Grimcutty
