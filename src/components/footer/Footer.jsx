import PropTypes from 'prop-types';

export const Footer = ({ className }) => {
   return (
      <div className={`bg-[#945125] text-white p-5 w-full ${className}`}>
         Footer
      </div>
   )
}

Footer.propTypes = {
   className: PropTypes.string
}
