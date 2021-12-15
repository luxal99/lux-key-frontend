import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";

export class DialogUtil {
  static openDialog(component: ComponentType<any>, options: MatDialogConfig, dialog: MatDialog): MatDialogRef<any> {
    return dialog.open<any>(component, options);

  }
}
