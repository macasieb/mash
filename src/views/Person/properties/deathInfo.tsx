import LinkedRenderStore from "link-lib";
import { link, LinkedResourceContainer } from "link-redux";
import { SomeTerm } from "rdflib";
import * as React from "react";
import InfoListItemLabel from "../../../components/InfoListItemLabel";
import InfoListItemText from "../../../components/InfoListItemText";

import { PersonTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";

import { InfoListTopology } from "../../../topologies";
import { InfoListItem } from "../../../topologies/InfoListItem";

interface PropTypes {
    birthDate?: SomeTerm;
    deathDate?: SomeTerm;
    deathPlace?: SomeTerm;
}

function calcAge(birth: number, death: number) {
    return ~~((death - birth) / (31557600000));
}

class PersonDeathInfoList extends React.PureComponent<PropTypes> {
    public ageLabel() {
        const {
            birthDate,
            deathDate,
        } = this.props;
        if (!birthDate || !deathDate) {
            return null;
        }

        const birth = Date.parse(birthDate.value);
        const death = Date.parse(deathDate.value);

        if (!birth || !death) {
            return null;
        }

        return (
            <React.Fragment>
                {` (aged ${calcAge(birth, death)})`}
            </React.Fragment>
        );
    }

    public render() {
        const {
            deathDate,
            deathPlace,
        } = this.props;

        if (!(deathDate || deathPlace)) {
            return null;
        }

        let BirthPlaceLabel;
        if (deathPlace && deathPlace.termType === "NamedNode") {
            BirthPlaceLabel = () => (
                <React.Fragment>
                    {" in "}<LinkedResourceContainer subject={deathPlace} />
                </React.Fragment>
            );
        } else if (deathPlace && deathPlace.termType === "Literal") {
            BirthPlaceLabel = () => ` in ${deathPlace.value}`;
        }

        const label = `${deathDate ? ` on ${deathDate.value}` : ""}`;

        return (
            <InfoListItem>
                <InfoListItemLabel>Died</InfoListItemLabel>
                <InfoListItemText>
                    {label}{this.ageLabel()}{BirthPlaceLabel && <BirthPlaceLabel />}
                </InfoListItemText>
            </InfoListItem>
        );
    }
}

export default LinkedRenderStore.registerRenderer(
  link([
      NS.dbo("deathDate"),
      NS.dbo("deathPlace"),
      NS.dbo("birthDate"),
  ])(PersonDeathInfoList),
  PersonTypes,
  NS.app("deathInfo"),
  InfoListTopology,
);
