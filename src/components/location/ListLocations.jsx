import { ItemLocation } from "./ItemLocation"

export const ListLocations = ({ className, data = [] }) => {
  return (
    <section
      className={`grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8 auto-rows-[35rem] ${className}`}
    >
      {
        data.map((value, index) => (
          <ItemLocation
            key={value?.id ?? new Date().getTime() + index}
            {...value}
          />
        ))
      }
    </section>
  )
}
