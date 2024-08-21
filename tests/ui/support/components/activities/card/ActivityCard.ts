import { BaseComponent } from '../../BaseComponent';
import { Title } from '../../common-components/title/Title';
import { ActivityCardBadge } from './ActivityCardBadge';
import { Image } from '../../common-components/image/Image';

export type ActivityCardContent = {
    badge: string;
    title: string;
    image: string;
    subtitle: string;
    additionalInfo: string;
    participants: string;
    participantsAvatars: string;
};

const ActivityCardSelectors = {
    body: '[class*=styles_card]',
    image: '[class*=styles_imgWrap]',
    //badge: '[class*=styles_badge]',
    title: '[class*=styles_headline]',
    subtitle: '[class*=styles_regular]',
    additionalInfo: '[class*=styles_addInfo]',
    participants: '[class*="styles_participants"]',
    participantsAvatars:
        '[class*="styles_participants"] [class^="styles_avatarGroups"] img'
};

export class ActivityCard extends BaseComponent {
    public static body = ActivityCardSelectors.body;
    public selectors = ActivityCardSelectors;

    // public badge = new ActivityCardBadge({
    //     locator: this.locator.locator(ActivityCardSelectors.badge)
    // });
    public title = new Title({
        locator: this.locator.locator(ActivityCardSelectors.title)
    });
    public subtitle = new Title({
        locator: this.locator.locator(ActivityCardSelectors.subtitle)
    });
    public image = new Image({
        locator: this.locator.locator(ActivityCardSelectors.image)
    });
    public additionalInfo = new Title({
        locator: this.locator.locator(ActivityCardSelectors.additionalInfo)
    });
    public participants = new Title({
        locator: this.locator.locator(ActivityCardSelectors.participants)
    });
    public participantsAvatars = new Image({
        locator: this.locator.locator(ActivityCardSelectors.participantsAvatars)
    });
}
