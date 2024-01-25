import { getBrowser, getOS } from '~app/utils/navigator'

interface PremiumActivation {
  licenseKey: string
  instanceId: string
}

function getInstanceName() {
  return `${getOS()} / ${getBrowser()}`
}

export function getPremiumActivation(): PremiumActivation | null {
  return null
}
