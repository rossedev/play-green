import { Column, ContainerSideBar, TextOverlay } from "@/styles/SideBar.styled";
import { Sport } from "@/types/sports";
import Image from "next/image";

export const SideBar = ({ sports }: { sports: Sport[] }) => {
  return (
    <ContainerSideBar>
      {sports.map((sport, index) => (
        <Column key={index}>
          <Image
            src={sport.strSportThumb}
            alt={sport.strSport}
            width={250}
            height={150}
            layout="responsive"
          />
          <TextOverlay>{sport.strSport}</TextOverlay>
        </Column>
      ))}
    </ContainerSideBar>
  );
};
