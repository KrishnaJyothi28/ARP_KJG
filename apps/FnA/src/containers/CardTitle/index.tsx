import { CardTitleProps } from 'src/lib/interface'
import TitleInformation from 'ui/TitleInformation'

export default function CardTitle({ title, details, bgColor }: CardTitleProps) {
  return <TitleInformation title={title} detail={details ? details : ''} bgColor={bgColor}></TitleInformation>
}
