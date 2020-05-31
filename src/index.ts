import locationInfo from './pipeline'

const args = process.argv.slice(2)

if(args.length < 1) {
  console.log('Provide at least one location')

  process.exit(1)
}

locationInfo(args)

