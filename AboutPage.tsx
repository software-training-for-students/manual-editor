import * as React from "react";
import * as Image from "./Image";
import PageBreak from "./PageBreak";

export default class AboutPage extends React.Component<void, void> {
    public render() {
        return (
            <div>           
                <h1 className="no-top-margin">About Software Training for Students</h1>
                <div id="about-page">
                    <p>Software Training for Students is an organization on campus that provides free software training to all students and faculty. Our services include custom workshops, open-enrollment classes, one-on-one project help, and access to Lynda.com. For more information on the Software Training for Students (STS) program, visit our website at <strong><a href="http://wisc.edu/sts">wisc.edu/sts</a></strong>.</p>
                    <Image.SingleImage className="full-width-image" source="http://software-training-for-students.github.io/manual-master-files/sts-services.png" />
                    <p>STS is part of the Division of Information Technology (DoIT) - Academic Technology at UW-Madison. For more information regarding DoIT Academic Technology, visit <strong><a href="https://at.doit.wisc.edu/">at.doit.wisc.edu</a></strong>.</p><p><strong>© University of Wisconsin Board of Regents.</strong></p>
                    <p>This manual and any accompanying files were developed for use by current students at the University of Wisconsin-Madison. The names of software products referred to in these materials are claimed as trademarks of their respective companies or trademark holder.</p><p>If you are not a current member of the UW-Madison community and would like to use STS materials for self-study or to teach others, please contact sts@doit.wisc.edu. Thank you.</p>
                    </div>
                    <PageBreak />
            </div>
        );
    }
}