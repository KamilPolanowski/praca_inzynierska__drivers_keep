import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseDatabaseService } from '@dk-sys/firebase-database-service/firebase-database.service';
import { UserInfoForRegister } from '@dk-shared/interfaces/database-structures/users.interface';

@Component({
  selector: 'dk-glowny-widok',
  templateUrl: './glowny-widok.component.html',
  styleUrls: ['./glowny-widok.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlownyWidokComponent implements OnInit {
  private userToRegister: UserInfoForRegister = this.firebaseDatabaseService.exposeUserRegInfo();

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) { }

  ngOnInit() {
    if (!!this.userToRegister) {
      this.firebaseDatabaseService.write('/users/' + this.userToRegister.key, this.userToRegister.toRegister, wrote => {
        console.log('wrote', wrote);
      });
    }
  }

}
