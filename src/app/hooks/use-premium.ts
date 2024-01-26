import { useTranslation } from 'react-i18next'
import Button from '~app/components/Button'
import DiscountBadge from '~app/components/Premium/DiscountBadge'
import FeatureList from '~app/components/Premium/FeatureList'
import PriceSection from '~app/components/Premium/PriceSection'
import { usePremium } from '~app/hooks/use-premium'
import { useState } from 'react' // Added import for useState

function PremiumPage() {
  const { t } = useTranslation()
  const premiumState = usePremium()
  const [isExploding, setIsExploding] = useState(false)

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
        {premiumState.activated ? (
          <>
            <Button
              text={t('License activated')}
              color="primary"
              className="w-fit !py-2"
              onClick={() => setIsExploding(true)}
            />
          </>
        ) : (
          <>
            <Button
              text={t('Activate license')}
              color="flat"
              className="w-fit !py-2 rounded-lg"
              onClick={() => setIsExploding(true)}
            />
          </>
        )}
      </div>
      {isExploding && <ConfettiExplosion duration={3000} onComplete={() => setIsExploding(false)} />}
    </div>
  )
}

export default PremiumPage
