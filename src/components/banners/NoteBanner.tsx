import "../../styles/style.scss"

const NoteBanner = () => {
  return(
      <section className="note">
          <div className="container text-center">
              <p className="lead text-light p-1">NOTE: The booking must be done minimum before 3 hours through online
                  booking.</p>
          </div>
      </section>
  );
}

export default NoteBanner;
