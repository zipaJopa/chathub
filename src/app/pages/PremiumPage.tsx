import { useSearch } from '@tanstack/react-router'
import { get as getPath } from 'lodash-es'
import { useCallback, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import Button from '~app/components/Button'
import DiscountBadge from '~app/components/Premium/DiscountBadge'
import FeatureList from '~app/components/Premium/FeatureList'
import PriceSection from '~app/components/Premium/PriceSection'
import { useDiscountCode } from '~app/hooks/use-purchase-info'
import { trackEvent } from '~app/plausible'
import { premiumRoute } from '~app/router'

function PremiumPage() {
  const { t } = useTranslation()
  const [isExploding, setIsExploding] = useState(false)
  const discountCode = useDiscountCode()

  const deactivateLicense = useCallback(async () => {
    if (!window.confirm('Are you sure to deactivate this device?')) {
      return
    }
    trackEvent('deactivate_license')
    setTimeout(() => location.reload(), 500)
  }, [])

  return (
    <div className="flex flex-col bg-primary-background dark:text-primary-text rounded-[20px] h-full p-[50px] overflow-y-auto">
      <h1 className="font-bold text-[40px] leading-none text-primary-text">{t('Premium')}</h1>
      <div className="flex flex-col gap-4 mt-9">
        <DiscountBadge />
        <PriceSection align="left" />
      </div>
      <div className="mt-8">
        <FeatureList />
      </div>
      <div className="flex flex-row items-center gap-3 mt-10">
        <a
          href={`https://chathub.gg/api/premium/redirect?source=${source || ''}&discountCode=${discountCode || ''}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('click_buy_premium', { source: 'premium_page' })}
        >
          <Button text={t('Buy premium license')} color="primary" className="w-fit !py-2 rounded-lg" />
        </a>
        <Button
          text={t('Activate license')}
          color="flat"
          className="w-fit !py-2 rounded-lg"
          onClick={activate}
          isLoading={activating || premiumState.isLoading}
        />
      </div>
      <a
        href="https://app.lemonsqueezy.com/my-orders/"
        target="_blank"
        rel="noreferrer"
        className="underline ml-2 text-sm text-secondary-text font-medium w-fit"
      >
        {t('Manage order and devices')}
      </a>
      <Toaster position="top-right" />
      {isExploding && <ConfettiExplosion duration={3000} onComplete={() => setIsExploding(false)} />}
    </div>
  )
}

export default PremiumPage
