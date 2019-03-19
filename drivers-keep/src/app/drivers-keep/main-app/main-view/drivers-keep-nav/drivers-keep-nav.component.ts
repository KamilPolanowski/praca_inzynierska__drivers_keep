import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { FirebaseDatabaseService } from '@drivers-keep-shared/services/firebase-database-service/firebase-database.service';
import { UserKinds, UserCredentials } from '@drivers-keep-shared/interfaces/users.interface';
import { FirebaseAuthService } from '@drivers-keep-shared/services/firebase-auth-service/firebase-auth-service.service';
import { Router } from '@angular/router';

interface MenuElement {
  label: string;
  path: string;
}

interface MenuElementSnapshot {
  [prop: string]: MenuElement;
}

@Component({
  selector: 'drivers-keep-nav',
  templateUrl: './drivers-keep-nav.component.html',
  styleUrls: ['./drivers-keep-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rolloutPanel', [
      state('void', style({
        transform: 'translateX(-100%)'
      })),
      state('show', style({
        transform: 'translateX(0)'
      })),
      transition('void => show', [
        animate('1s ease-out')
      ])
    ]),
    trigger('shrinkingAlerts', [
      state('false', style({
        height: '*'
      })),
      state('true', style({
        height: '51px'
      })),
      transition('true => false', [
        animate('0.5s ease-out')
      ]),
      transition('false => true', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('expandingAlerts', [
      state('false', style({
        height: '50%'
      })),
      state('true', style({
        height: 'calc(100% - 51px)'
      })),
      transition('true => false', [
        animate('0.5s ease-out')
      ]),
      transition('false => true', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('shrinkingSmses', [
      state('false', style({
        height: '*'
      })),
      state('true', style({
        height: '51px'
      })),
      transition('true => false', [
        animate('0.5s ease-out')
      ]),
      transition('false => true', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('expandingSmses', [
      state('false', style({
        height: '50%'
      })),
      state('true', style({
        height: 'calc(100% - 51px)'
      })),
      transition('true => false', [
        animate('0.5s ease-out')
      ]),
      transition('false => true', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class DriversKeepTasksComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public navPanelCtxtMenu: ContextMenuComponent;
  @Output() userHasChosenMenuElement: EventEmitter<boolean> = new EventEmitter;
  public tabsAvailable: boolean = false;
  public tabs: MenuElement[] = [];
  private userCredentials: UserCredentials;

  constructor(
    private firebabaseAuthService: FirebaseAuthService,
    private firebaseDatabaseService: FirebaseDatabaseService,
    private cd: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    this.userCredentials = this.firebabaseAuthService.exposeUserCredentials();

    if (!!this.userCredentials && !!this.userCredentials.permission) {
      this.getMenuElementsDependingOnUserPermissions(this.userCredentials.permission);
    } else {
      this.firebabaseAuthService.getUserPermissions().then(userCredentials => {
        this.userCredentials = userCredentials;
        this.getMenuElementsDependingOnUserPermissions(userCredentials.permission);
      });
    }
  }

  private getMenuElementsDependingOnUserPermissions(userKind: UserKinds): void {
    this.firebaseDatabaseService.read('/menuElements/' + userKind).then(snapshot => {
      if (!!snapshot && !!snapshot.val()) {
        this.prepareTabLabels(snapshot.val());
      }
    }).catch(err => { throw err; });
  }

  private prepareTabLabels(menuElSnap: MenuElementSnapshot): MenuElement[] | never {
    const tabOutput: MenuElement[] = [];
    if (!!menuElSnap) {
      Object.values(menuElSnap).forEach(value => {
        tabOutput.push(value);
      });
      if (tabOutput.length > 0) {
        this.tabsAvailable = true;
      }
      this.cd.markForCheck();
      return this.tabs = tabOutput;
    } else {
      throw new Error('Błąd przy pobieraniu zakładek do menu - obiekt pusty');
    }
  }

  public menuElementChosen(route: string): void {
    this.userHasChosenMenuElement.emit(true);
    let permissionString: string = '';

    if (!!this.userCredentials && this.userCredentials.permission) {
      if (this.userCredentials.permission === UserKinds.Magazynier) {
        permissionString = 'magazyn/';
      } else if (this.userCredentials.permission === UserKinds.Pracownik) {
        permissionString = 'pracownik/';
      } else if (this.userCredentials.permission === UserKinds.Admin) {
        permissionString = 'admin/';
      }
    }
    console.log('route', '/drivers-keep/' + permissionString + route);
    this.router.navigate(['/drivers-keep/' + permissionString + route]);
  }
}
