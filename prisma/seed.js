import { PrismaClient } from '@prisma/client'
import libraryList from '../src/entities/library/model/data/libraryList.json' assert { type: 'json' }
import frameworkList from '../src/entities/filter/lib/model/data/frameworkList.json' assert { type: 'json' }
import featureList from '../src/entities/filter/lib/model/data/featureList.json' assert { type: 'json' }
import componentList from '../src/entities/filter/lib/model/data/componentList.json' assert { type: 'json' }
import categoryList from '../src/entities/filter/lib/model/data/categoryList.json' assert { type: 'json' }

const prisma = new PrismaClient();

async function seed() {
  const categoryEntries = await Promise.all(
    categoryList.map(category =>
      prisma.category.upsert({
        where: { value: category.value },
        update: {
          name: category.name,
          value: category.value
        },
        create: {
          name: category.name,
          value: category.value
        },
      })
    )
  )

  const frameworkEntries = await Promise.all(
    frameworkList.map(framework =>
      prisma.framework.upsert({
        where: { value: framework.value },
        update: {
          name: framework.name,
          value: framework.value
        },
        create: {
          name: framework.name,
          value: framework.value
        },
      })
    )
  )

  const featureEntries = await Promise.all(
    featureList.map(feature =>
      prisma.feature.upsert({
        where: { value: feature.value },
        update: {
          name: feature.name,
          value: feature.value
        },
        create: {
          name: feature.name,
          value: feature.value
        },
      })
    )
  )
  const componentEntries = await Promise.all(
    componentList.map(component =>
      prisma.component.upsert({
        where: { value: component.value },
        update: {
          name: component.name,
          value: component.value
        },
        create: {
          name: component.name,
          value: component.value
        },
      })
    )
  )

  await Promise.all(
    libraryList.map(async library => {
      const categoryEntry = categoryEntries.find(category => category.value === library.category);
      const frameworkEntriesToConnect = frameworkEntries.filter(framework => library.frameworks.includes(framework.value));
      const featureEntriesToConnect = featureEntries.filter(feature => library.features.includes(feature.value));
      const componentEntriesToConnect = componentEntries.filter(component => library.components.includes(component.value));

      await prisma.library.upsert({
        where: { value: library.value },
        update: {
          img: library.img,
          link: library.link,
          githubLink: library.githubLink,
          npmLink: library.npmLink,
          category: {
            connect: { id: categoryEntry?.id }
          },
          frameworks: {
            connect: frameworkEntriesToConnect.map(framework => ({ id: framework.id }))
          },
          features: {
            connect: featureEntriesToConnect.map(feature => ({ id: feature.id }))
          },
          components: {
            connect: componentEntriesToConnect.map(component => ({ id: component.id }))
          }
        },
        create: {
          name: library.name,
          value: library.value,
          img: library.img,
          link: library.link,
          githubLink: library.githubLink,
          npmLink: library.npmLink,
          category: {
            connect: { id: categoryEntry?.id }
          },
          frameworks: {
            connect: frameworkEntriesToConnect.map(framework => ({ id: framework.id }))
          },
          features: {
            connect: featureEntriesToConnect.map(feature => ({ id: feature.id }))
          },
          components: {
            connect: componentEntriesToConnect.map(component => ({ id: component.id }))
          }
        }
      });
    })
  );
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
