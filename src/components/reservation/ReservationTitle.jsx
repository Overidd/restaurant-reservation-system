import PropTypes from 'prop-types';

export const ReservationTitle = ({
  className,
  title,
  subtitle
}) => {
  return (
    <h3 className={`text-center w-fit ${className}`}>
      <span className="block text-lg tracking-wide capitalize text-card/80">
        {title}
      </span>
      <small className="block text-xl text-card">
        {subtitle}
      </small>
    </h3>
  )
}


ReservationTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}