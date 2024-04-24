import PageSection from "../components/others/PageSectionComponent/PageSectionComponent";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {

    const error = useRouteError()
    console.error(error)

    return (
        <PageSection id="ErrorPage">
            <h1>Error 404</h1>
        </PageSection>
    )
}
