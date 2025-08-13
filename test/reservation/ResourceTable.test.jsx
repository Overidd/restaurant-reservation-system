import { render, screen, fireEvent } from '@testing-library/react'
import { ResourceTable } from '../../src/components/UI/table/ResourceTable'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../card', () => ({
   UserCard: ({ user }) => <div>UserCard-{user.name}</div>,
}))

vi.mock('lucide-react', () => ({
   CalendarClock: () => <div>CalendarClockIcon</div>,
   ImageUpscale: () => <div>ImageUpscaleIcon</div>,
   CheckCircle: () => <div>CheckCircleIcon</div>,
   Calendar: () => <div>CalendarIcon</div>,
   Clock: () => <div>ClockIcon</div>,
   LockKeyhole: () => <div>LockKeyholeIcon</div>,
}))

describe('ResourceTable', () => {
   it('renderiza el nombre y las sillas correctas', () => {
      render(<ResourceTable name="Mesa 1" chairs={3} size="small" />)

      expect(screen.getByText('Mesa 1')).toBeInTheDocument()
   })

   it('llama a onClick al hacer click en la mesa', () => {
      const handleClick = vi.fn()
      render(<ResourceTable name="Mesa 2" onClick={handleClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
   })

   it('renderiza UserCard si se pasa user', () => {
      render(<ResourceTable name="Mesa 3" user={{ name: 'Juan' }} />)

      expect(screen.getByText('Juan')).toBeInTheDocument()
   })

   it('muestra el icono de bloqueo temporal si isBlockedTemp es true', () => {
      render(<ResourceTable name="Mesa 4" isBlockedTemp />)

      expect(screen.getByText('CalendarClockIcon')).toBeInTheDocument()
   })

   it('llama a onPreview al hacer click en el icono de preview', () => {
      const handlePreview = vi.fn()
      render(<ResourceTable name="Mesa 5" onPreview={handlePreview} />)

      fireEvent.click(screen.getByText('ImageUpscaleIcon'))
      expect(handlePreview).toHaveBeenCalledTimes(1)
   })
})
