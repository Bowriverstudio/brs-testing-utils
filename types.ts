import { ThemingProps } from "@chakra-ui/system";

export type FormikFieldController = ThemingProps & {
  /**
   * Formik's name
   */
  name: string;
  /**
   * Optional Label for the Field
   */
  label?: string;
  /**
   * Optional placeholder
   */
  placeholder?: string;
};
