const { PrismaClient } = require ('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
  await prisma.Experience.create({data: {detail: 'Estamos Empezando',},})
  await prisma.Experience.create({data: {detail: 'Entre 1 y 5 años',},})  
  await prisma.Experience.create({data: {detail: 'Entre 5 y 10 años',},})
  await prisma.Experience.create({data: {detail: 'Más de 10 años',},})
  await prisma.Scale.create({data: {scale_type: 'Pequeña', detail: 'ampliaciones/remodelaciones de casas, quinchos, terrazas, cocinas, etc'},})
  await prisma.Scale.create({data: {scale_type: 'Media Baja', detail: 'casas, refugios, remodelaciones de oficinas, locales comerciales, etc'},})
  await prisma.Scale.create({data: {scale_type: 'Media', detail: 'conjuntos de casas, edificios pequeños, centros médicos, etc'},})
  await prisma.Scale.create({data: {scale_type: 'Media Alta', detail: 'edificios, clínicas/hospitales, universidades, centros comerciales, etc'},})
  await prisma.Scale.create({data: {scale_type: 'Gran', detail: 'conjuntos de viviendas, parques industriales, planes maestros, etc'},})
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })