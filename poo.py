


class Perro:
   def __init__(self, name):
      self.isKill = 'Si puede morir'
      self.puedeComer = 'Si puede comer'
      self.nombre = name

   def comer(self):
      return 'Estoy comiendo'

   def dormir(self):
      return 'Estoy durmiendo'

class Humano(Perro):
   def __init__(self, name):
      super().__init__(name)

pepe = Humano('Pepe')

print(pepe.isKill)
print(pepe.puedeComer)
print(pepe.nombre)
print(pepe.comer())
print(pepe.dormir())