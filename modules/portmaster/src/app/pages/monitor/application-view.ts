import { Component, Input } from '@angular/core';
import { AppProfileService, DebugAPI, SessionDataService } from 'src/app/services';
import { InspectedProfile } from 'src/app/services/connection-tracker.service';
import { ConnectionStatistics } from 'src/app/services/connection-tracker.types';
import { ActionIndicatorService } from 'src/app/shared/action-indicator';
import { fadeInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-monitor-application',
  templateUrl: './application-view.html',
  styleUrls: ['./application-view.scss'],
  animations: [
    fadeInAnimation,
  ],
})
export class MonitorApplicationViewComponent {
  readonly nameRegex = /(.+)[\/\\](.+)$/gm;

  /** @private True if we are still loading the current profile. */
  get loading(): boolean {
    return this.profile?.loading || false;
  }

  /** @private The current (or empty) profile connection stats */
  get stats() {
    return this.profile?.stats || new ConnectionStatistics();
  }

  /** The inspected profile to display */
  @Input()
  profile: InspectedProfile | null = null;

  constructor(
    private debugAPI: DebugAPI,
    private profileSerivce: AppProfileService,
    public sessionDataService: SessionDataService,
    private actionIndicator: ActionIndicatorService,
  ) { }

  /**
   * @private
   * Retrieves debug information from the current
   * profile and copies it to the clipboard
   */
  copyDebugInfo() {
    if (!this.profile || !this.profile.profile) {
      return;
    }

    this.debugAPI.getProfileDebugInfo(this.profile.Source, this.profile.ID)
      .subscribe(data => {
        console.log(data);
        // Copy to clip-board if supported
        if (!!navigator.clipboard) {
          navigator.clipboard.writeText(data);
          this.actionIndicator.success('Copied to Clipboard')
        }
      })
  }
}
